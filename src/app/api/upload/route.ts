import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: "Poster upload is not configured. Add Cloudinary credentials to environment variables." }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Please choose an image." }, { status: 400 });
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Only images up to 5 MB are allowed." }, { status: 400 });

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "ecell-events";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest("hex");
  const upload = new FormData();
  upload.append("file", file);
  upload.append("api_key", apiKey);
  upload.append("timestamp", timestamp);
  upload.append("folder", folder);
  upload.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: upload });
  const data = await response.json();
  if (!response.ok) return NextResponse.json({ error: "Cloudinary upload failed." }, { status: 502 });
  return NextResponse.json({ url: data.secure_url });
}
