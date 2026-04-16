import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  const requestSecret =
    request.headers.get("x-revalidate-secret") ?? new URL(request.url).searchParams.get("secret");

  if (!secret || requestSecret !== secret) {
    return NextResponse.json({ ok: false, error: "Invalid revalidation secret." }, { status: 401 });
  }

  revalidateTag("projects", "max");
  revalidatePath("/");
  revalidatePath("/recent-work");
  revalidatePath("/developments");

  return NextResponse.json({ ok: true, revalidated: true });
}
