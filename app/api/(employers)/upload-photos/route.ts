"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const photos = formData.getAll("photos") as File[];
    const employerId = formData.get("employerId") as string;

    if (!photos || photos.length === 0) {
      return NextResponse.json(
        { message: "No photos uploaded" },
        { status: 400 }
      );
    }

    const fileUrls: string[] = [];

    for (const photo of photos) {
      const timestamp = Date.now();
      const extension = path.extname(photo.name);
      const fileName = `employer_${timestamp}_${photo.name}`;

      const assetsDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "employer",
        "photos"
      );
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await photo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      const fileUrl = `/assets/employer/photos/${fileName}`;
      fileUrls.push(fileUrl);
    }

    // Directly update the photos property
    const employer = await prisma.company.update({
      where: { id: employerId },
      data: {
        photos: {
          push: fileUrls, // Prisma lets you push into a String[] field
        },
      },
    });

    return NextResponse.json(
      { employer, message: "Photos Uploaded Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
