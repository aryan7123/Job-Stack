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
      confirm_password,
      role,
      terms_conditions,
    } = body;

    if (!your_name) {
      return NextResponse.json({ message: "Your Name is empty" });
    } else if (!email) {
      return NextResponse.json({ message: "Email is empty" });
    } else if (role === "Select Role") {
      return NextResponse.json({ message: "Please select your role" });
    } else if (!password) {
      return NextResponse.json({ message: "Password is empty" });
    } else if (!confirm_password) {
      return NextResponse.json({ message: "Confirm Password is empty" });
    } else if (password !== confirm_password) {
      return NextResponse.json({ message: "Password does not match" });
    } else if (!terms_conditions) {
      return NextResponse.json({ message: "You must accept terms and conditions" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: your_name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true
      }
    });

    return NextResponse.json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({
      message: "Something went wrong"
    });
  }
}
