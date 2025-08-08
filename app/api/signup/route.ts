"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      your_name,
      email,
      password,
      role,
      confirm_password,
      terms_conditions
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!your_name) {
      return NextResponse.json(
        { message: "Your Name is empty" },
        { status: 400 }
      );
    } else if (!email) {
      return NextResponse.json({ message: "Email is empty" }, { status: 400 });
    } 
    else if (role === "Select Role") {
      return NextResponse.json({ message: "Please select atleast one role" }, { status: 400 });
    }
    else if (!password) {
      return NextResponse.json(
        { message: "Password is empty" },
        { status: 400 }
      );
    } else if (!confirm_password) {
      return NextResponse.json(
        { message: "Confirm Password is empty" },
        { status: 400 }
      );
    } else if (password !== confirm_password) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 400 }
      );
    } else if (!terms_conditions) {
      return NextResponse.json(
        { message: "You must accept terms and conditions" },
        { status: 400 }
      );
    } else if (existingUser) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: your_name,
        email,
        role,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        password: true,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
