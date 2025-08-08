"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is empty" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ message: "Password is empty" }, { status: 400 });
    }
    if (!role) {
      return NextResponse.json(
        { message: "Please select at least one role" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email, role },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email Address does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}

