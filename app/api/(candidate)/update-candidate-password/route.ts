"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt, { compare } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { userId, old_password, new_password, retype_password } = await req.json();

    if (!userId || !old_password || !new_password || !retype_password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const isPasswordValid = await compare(old_password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid old password" },
        { status: 400 }
      );
    }

    if(new_password !== retype_password) {
      return NextResponse.json(
        { error: "Password does not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Password updated successfully", success: true }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

