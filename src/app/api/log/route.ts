
export async function POST(req: Request) {
  const data = await req.json();

  console.log("🔥 SERVER:", data);

  return Response.json({ success: true });
}