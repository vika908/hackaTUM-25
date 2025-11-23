import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, strength } = body

    // Use provided strength or default to 2, keep target_radius at 40
    const requestBody = {
      prompt: prompt,
      strength: strength || 2,
      target_radius: 40,
    }

    const response = await fetch("https://unsagging-limberly-crissy.ngrok-free.dev/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    )
  }
}

