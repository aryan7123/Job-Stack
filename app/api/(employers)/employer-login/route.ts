"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is empty" }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json(
        { message: "Password is empty" },
        { status: 400 }
      );
    }
    const employer = await prisma.company.findUnique({
      where: { email },
    });

    if (!employer) {
      return NextResponse.json(
        { message: "Email Address does not exist" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, employer.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Login Successful" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
