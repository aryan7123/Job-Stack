"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is empty" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: "Password is empty" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email Address does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect Password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Login Successful" });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}