import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/app/lib/prisma"
import path from "path"
import { promises as fs } from "fs"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const employerId = formData.get("employerId") as string;
    const files = formData.getAll("photos") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: "No files uploaded" }, { status: 400 })
    }

    const uploadedPaths: string[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const uploadDir = path.join(process.cwd(), "public", "assets", "employer", "photos");
      const filepath = path.join(uploadDir, filename);

      // Ensure uploads folder exists
      await fs.mkdir(uploadDir, { recursive: true });

      // Save file
      await fs.writeFile(filepath, buffer);

      // Store public path
      uploadedPaths.push(`/assets/employer/photos/${filename}`);
    }

    // Example DB save (you can customize Employer / Candidate model)
    const employer = await prisma.company.update({
      where: {
        id: employerId
      },
      data: {
        photos: uploadedPaths
      }
    });

    return NextResponse.json({ success: true, employer })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 })
  }
}
