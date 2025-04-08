import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest): Promise<Response> {
  const referrer = request.headers.get("referer");

  try {
    if (referrer) {
      const referrerUrl = new URL(referrer);
      const hostname = referrerUrl.hostname;

      if (hostname !== "localhost" && !hostname.endsWith(".datocms.com")) {
        return new NextResponse("Invalid referrer", { status: 400 });
      }
    }
  } catch (error) {
    return new NextResponse("Invalid referrer", { status: 400 });
  }

  const { searchParams } = request.nextUrl;
  const rawUrlParam = searchParams.get("url");
  if (!rawUrlParam) {
    return new NextResponse("No URL param specified", { status: 400 });
  }

  const decodedUrlParam = decodeURIComponent(rawUrlParam);

  const destinationResponse = await fetch(decodedUrlParam);

  const newHeaders = new Headers(destinationResponse.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");
  newHeaders.set('Access-Control-Allow-Methods', 'GET');

  return new NextResponse(destinationResponse.body, {
    status: destinationResponse.status,
    headers: newHeaders,
  });
}
