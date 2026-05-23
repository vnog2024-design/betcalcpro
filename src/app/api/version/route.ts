import { NextResponse } from 'next/server'

// Returns the current app version for update detection
export async function GET() {
  return NextResponse.json({
    version: process.env.NODE_ENV === 'development'
      ? `dev-${Date.now()}`
      : 'v4',
    timestamp: Date.now(),
  })
}
