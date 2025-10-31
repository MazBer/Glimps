import { useEffect, useMemo, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function getHost() {
	// Use current page host for HTTP, but WS server runs on port 8080 by default
	const { hostname } = window.location
	return hostname
}

interface PairingProps {
  onConnect: (wsUrl: string) => void
  connected: boolean
}

export default function Pairing({ onConnect, connected }: PairingProps) {
	const [wsUrl, setWsUrl] = useState<string | null>(null)

	useEffect(() => {
		const host = getHost()
		fetch(`http://${host}:8080/token`)
			.then((r) => r.json())
			.then((data) => {
				setWsUrl(data.wsUrl)
				onConnect(data.wsUrl)
			})
			.catch(() => {
				console.error('Failed to get token from server')
			})
	}, [onConnect])

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
				<span className={connected ? 'text-primary' : 'text-white/60'}>
					{connected ? 'connected' : 'waiting for phone...'}
				</span>
			</p>
		</div>
	)
}
