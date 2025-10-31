import http from 'http'
import { WebSocketServer } from 'ws'
import os from 'os'
import crypto from 'crypto'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080

function getLocalIp() {
	const nets = os.networkInterfaces()
	for (const name of Object.keys(nets)) {
		for (const ni of nets[name] || []) {
			if (ni.family === 'IPv4' && !ni.internal) return ni.address
		}
	}
	return 'localhost'
}

const sessions = new Map()

function createToken() {
	return crypto.randomUUID()
}

const server = http.createServer((req, res) => {
	if (req.method === 'GET' && req.url === '/token') {
		const token = createToken()
		sessions.set(token, { phone: null, display: null })
		const host = getLocalIp()
		const wsUrl = `ws://${host}:${PORT}/session/${token}`
		res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
		res.end(JSON.stringify({ token, wsUrl }))
		return
	}
	res.writeHead(404)
	res.end()
})

const wss = new WebSocketServer({ noServer: true })

wss.on('connection', (ws, request, client) => {
	const url = new URL(request.url || '', `http://${request.headers.host}`)
	const parts = url.pathname.split('/')
	const token = parts[2]
	const session = sessions.get(token)
	if (!session) {
		ws.close(1008, 'Invalid session token')
		return
	}

	let roleAssigned = false

	ws.on('message', (message) => {
		try {
			const data = JSON.parse(message.toString())
			if (!roleAssigned && data?.type === 'hello' && (data.role === 'phone' || data.role === 'display')) {
				roleAssigned = true
				if (data.role === 'phone') {
					session.phone = ws
				} else {
					session.display = ws
				}
				ws.send(JSON.stringify({ type: 'ack', role: data.role }))
				return
			}
			// Forward payloads from phone to display
			if (data?.type === 'data' && session.phone === ws && session.display) {
				session.display.send(JSON.stringify({ type: 'data', payload: data.payload }))
			}
		} catch {}
	})

	ws.on('close', () => {
		if (session.phone === ws) session.phone = null
		if (session.display === ws) session.display = null
		if (!session.phone && !session.display) {
			sessions.delete(token)
		}
	})
})

server.on('upgrade', (request, socket, head) => {
	const { url } = request
	if (!url || !url.startsWith('/session/')) {
		socket.destroy()
		return
	}
	wss.handleUpgrade(request, socket, head, (ws) => {
		wss.emit('connection', ws, request)
	})
})

server.listen(PORT, () => {
	console.log(`Glimps relay server listening on http://${getLocalIp()}:${PORT}`)
})
