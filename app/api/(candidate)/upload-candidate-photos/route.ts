"use server";

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const profile_picture = formData.get("profile_picture") as File | null;
    const background = formData.get("background") as File | null;
    const userId = formData.get("userId") as string;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!profile_picture || !background) {
      return NextResponse.json(
        { success: false, error: "Please upload at least one file" },
        { status: 400 }
      );
    }

    let userUpdateData: any = {};
    let profileUpdateData: any = {};

    // ---- Avatar upload (User table) ----
    if (profile_picture) {
      const timestamp = Date.now();
      const extension = path.extname(profile_picture.name);
      const fileName = `profile_${timestamp}${extension}`;

      const assetsDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "candidates",
        "profile"
      );
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await profile_picture.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      userUpdateData.avatar = `/assets/candidates/profile/${fileName}`;
    }

    // ---- Background upload (Profile table) ----
    if (background) {
      const timestamp = Date.now();
      const extension = path.extname(background.name);
      const fileName = `background_${timestamp}${extension}`;

      const assetsDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "candidates",
        "background"
      );
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await background.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      profileUpdateData.background = `/assets/candidates/background/${fileName}`;
    }

    // ---- Apply updates ----
    let updatedUser = null;
    if (Object.keys(userUpdateData).length > 0) {
      updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userUpdateData,
      });
    }

    let updatedProfile = null;
    if (Object.keys(profileUpdateData).length > 0) {
      updatedProfile = await prisma.profile.update({
        where: { userId },
        data: profileUpdateData,
      });
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
      profile: updatedProfile,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
