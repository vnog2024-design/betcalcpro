import { NextResponse } from 'next/server'

// Lightweight health check endpoint for the platform
// Returns immediately without any database or heavy operations
export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: Date.now() }, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
