import { useEffect, useMemo, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function getHost() {
	// Use current page host for HTTP, but WS server runs on port 8080 by default
	const { hostname } = window.location
	return hostname
}

export default function Pairing() {
	const [token, setToken] = useState<string | null>(null)
	const [wsUrl, setWsUrl] = useState<string | null>(null)
	const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')
	const wsRef = useRef<WebSocket | null>(null)

	useEffect(() => {
		const host = getHost()
		fetch(`http://${host}:8080/token`)
			.then((r) => r.json())
			.then((data) => {
				setToken(data.token)
				setWsUrl(data.wsUrl)
			})
			.catch(() => setStatus('error'))
	}, [])

	useEffect(() => {
		if (!token || !wsUrl) return
		setStatus('connecting')
		const ws = new WebSocket(wsUrl)
		wsRef.current = ws

		ws.addEventListener('open', () => {
			ws.send(JSON.stringify({ type: 'hello', role: 'display' }))
			setStatus('connected')
		})
		ws.addEventListener('close', () => setStatus('error'))
		ws.addEventListener('error', () => setStatus('error'))

		return () => {
			ws.close()
		}
	}, [token, wsUrl])

	const qrValue = useMemo(() => wsUrl ?? '', [wsUrl])

	return (
		<div className="widget-card rounded-xl p-6 sm:p-8 flex flex-col gap-4 items-center justify-center text-center">
			<h2 className="text-white text-2xl font-bold">Pair your phone</h2>
			<p className="text-white/80 text-sm">Scan to connect over your Wi‑Fi network</p>
			{qrValue ? (
				<div className="bg-white p-3 rounded-lg">
					<QRCodeCanvas value={qrValue} size={192} level="M" includeMargin={false} />
				</div>
			) : (
				<p className="text-white/60">Generating QR...</p>
			)}
			<p className="text-sm mt-2">
				<span className={status === 'connected' ? 'text-primary' : 'text-white/60'}>
					{status}
				</span>
			</p>
		</div>
	)
}
