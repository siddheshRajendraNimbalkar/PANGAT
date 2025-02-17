import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const room = searchParams.get("room");
    const username = searchParams.get("username");

    if (!room || !username) {
      return new Response(JSON.stringify({ error: "Missing room or username" }), { status: 400 });
    }

    if (!process.env.LIVEKIT_API_SECRET || !process.env.LIVEKIT_API_KEY) {
      return new Response(JSON.stringify({ error: "LIVEKIT API keys are missing" }), { status: 500 });
    }

    const token = jwt.sign(
      {
        video: {
          room,
          roomJoin: true,
          canPublish: true,
          canSubscribe: true,
        },
      },
      process.env.LIVEKIT_API_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "1h",
        issuer: process.env.LIVEKIT_API_KEY,
        subject: username,
      }
    );

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error: any) {
    console.error("Token Generation Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}
