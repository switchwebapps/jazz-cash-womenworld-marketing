
export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const userIp = forwardedFor.split(",")[0]?.trim()
    || req.headers.get("cf-connecting-ip")
    || req.headers.get("x-real-ip")
    || "unknown";

  const message = typeof data?.message === "string" ? data.message : "";
  const enrichedMessage = message.includes("user_ip=")
    ? message
    : `${message}${message ? " | " : ""}user_ip=${userIp}`;

  console.log("🔥 SERVER:", enrichedMessage);

  return Response.json({ success: true });
}