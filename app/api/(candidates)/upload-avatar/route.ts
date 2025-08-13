"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { avatarUrl, userId } = body;

    const buffer = Buffer.from(avatarUrl);
    const assetsDir = path.join(process.cwd(), "public", "assets", "avatar");
    fs.mkdirSync(assetsDir, { recursive: true });

    // Fixed filename → will overwrite every time
    const fileName = "avatar.png";
    const filePath = path.join(assetsDir, fileName);

    // Save file (overwrites old one automatically)
    fs.writeFileSync(filePath, buffer);

    // Add a cache-busting query param so the browser doesn't show old image
    const imageUrl = `/assets/avatar/${fileName}?t=${Date.now()}`;

    if (avatarUrl && userId) {
      const updateUserAvatar = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            avatar: imageUrl
        }
      });

      return NextResponse.json({ user: updateUserAvatar, message: "Avatar Image Uploaded Successfully" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "You have exceeded your monthly included credits for Inference Providers. Subscribe to PRO to get 20x more monthly included credits" });
  }
}
