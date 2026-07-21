import { NextResponse } from "next/server";
import http from "node:http";

const UPSTREAM = "http://api.womenworld.com.pk/checkSubscriber_ww";

function getWithBody(msisdn: string): Promise<{ status: number; body: string }> {
  const payload = JSON.stringify({ msisdn });

  return new Promise((resolve, reject) => {
    const req = http.request(
      UPSTREAM,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 500,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      }
    );

    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

export async function POST(request: Request) {
  try {
    const { msisdn } = (await request.json()) as { msisdn?: string };

    if (!msisdn) {
      return NextResponse.json(
        { success: false, message: "msisdn is required" },
        { status: 400 }
      );
    }

    const upstream = await getWithBody(msisdn);
    const data = JSON.parse(upstream.body);
    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Upstream request failed",
      },
      { status: 500 }
    );
  }
}
