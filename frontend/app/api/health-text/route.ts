import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://willy-binucleate-talitha.ngrok-free.dev/health", {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })

    return NextResponse.json({ 
      status: response.ok ? "up" : "down",
      statusCode: response.status 
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json({ 
      status: "down",
      statusCode: 500 
    })
  }
}

