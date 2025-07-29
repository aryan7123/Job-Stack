"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isPasswordValid = await compare(password, user.password);

    if (!email) {
      return NextResponse.json({ message: "Email is empty" }, { status: 400 });
    } else if (!password) {
      return NextResponse.json(
        { message: "Password is empty" },
        { status: 400 }
      );
    } else if (!user) {
      return NextResponse.json(
        { message: "Email Address does not exists" },
        { status: 400 }
      );
    } else if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { message: "Login Successful" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
