import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

const ALLOWED = ["english", "arabic", "spanish", "somali", "dari"]

export async function GET(
  _req: NextRequest,
  { params }: { params: { lang: string } }
) {
  const lang = params.lang

  if (!ALLOWED.includes(lang)) {
    return new NextResponse("Not found", { status: 404 })
  }

  const filePath = path.join(process.cwd(), "public", "poster", `poster_${lang}.pdf`)

  try {
    const file = await readFile(filePath)
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      },
    })
  } catch {
    return new NextResponse("Not found", { status: 404 })
  }
}
