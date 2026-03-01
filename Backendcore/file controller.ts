import { generateUploadUrl } from "../services/s3.service";

export async function generateSignedUrl(req, res) {
  const { url, key } = await generateUploadUrl(req.user.userId);
  res.json({ url, key });
}
