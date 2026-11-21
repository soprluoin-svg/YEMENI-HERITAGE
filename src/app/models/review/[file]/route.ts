import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { coffeeReviewEnabled, coffeeReviewFiles } from "@/lib/coffee-review";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  if (!coffeeReviewEnabled() || !Object.hasOwn(coffeeReviewFiles, file)) {
    return new Response(null, { status: 404 });
  }

  const name = file as keyof typeof coffeeReviewFiles;
  try {
    const bytes = await readFile(
      join(process.cwd(), "assets", "coffee-review", name),
    );
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": coffeeReviewFiles[name],
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
