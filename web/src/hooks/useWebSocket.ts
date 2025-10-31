import { useEffect, useRef, useState } from 'react'
import type { GlimpsData, WebSocketMessage } from '../types'

interface UseWebSocketOptions {
  wsUrl: string | null
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
}

export function useWebSocket(options: UseWebSocketOptions) {
  const { wsUrl, onConnect, onDisconnect, onError } = options
  const [data, setData] = useState<GlimpsData | null>(null)
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle')
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!wsUrl) return

    let reconnectAttempts = 0
    const maxReconnectAttempts = 5
    const reconnectDelays = [1000, 2000, 4000, 8000, 16000] // Exponential backoff

    const connect = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) return

      setStatus('connecting')
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({ type: 'hello', role: 'display' }))
        setStatus('connected')
        reconnectAttempts = 0
        onConnect?.()
      })

      ws.addEventListener('message', (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          if (message.type === 'ack' && message.role === 'display') {
            // Connection acknowledged
          } else if (message.type === 'data' && message.payload) {
            setData(message.payload)
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      })

      ws.addEventListener('close', () => {
        setStatus('error')
        onDisconnect?.()
        // Attempt reconnection with exponential backoff
        if (reconnectAttempts < maxReconnectAttempts) {
          const delay = reconnectDelays[reconnectAttempts] || 30000
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts++
            connect()
          }, delay)
        }
      })

      ws.addEventListener('error', (error) => {
        setStatus('error')
        onError?.(error)
      })
    }

    connect()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      wsRef.current?.close()
      wsRef.current = null
    }
  }, [wsUrl, onConnect, onDisconnect, onError])

  return { data, status, ws: wsRef.current }
}

