"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt, { compare } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { old_password, new_password, retype_password, userId } = body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const isPasswordValid = await compare(old_password, user.password);

    if (!old_password) {
      return NextResponse.json(
        { message: "Old Password is empty" },
        { status: 400 }
      );
    } else if (!new_password) {
      return NextResponse.json(
        { message: "New Password is empty" },
        { status: 400 }
      );
    } else if (!retype_password) {
      return NextResponse.json(
        { message: "Re-Type Password is empty" },
        { status: 400 }
      );
    } else if (new_password !== retype_password) {
      return NextResponse.json(
        { message: "Both the password does not match" },
        { status: 400 }
      );
    } else if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Old Password is incorrect" },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(new_password, 12);

      const updatePasswordDetails = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        { message: "Password Updated Successfully", updatePasswordDetails },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
