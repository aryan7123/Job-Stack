"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { your_name, email, password, confirm_password, terms_conditions } = body;

    const existingEmployer = await prisma.company.findUnique({
      where: {
        email
      },
    });

    if (!your_name) {
      return NextResponse.json(
        { error: "Your Name is empty" },
        { status: 400 }
      );
    } else if (!email) {
      return NextResponse.json({ error: "Email is empty" }, { status: 400 });
    } else if (!password) {
      return NextResponse.json(
        { error: "Password is empty" },
        { status: 400 }
      );
    } else if (!confirm_password) {
      return NextResponse.json(
        { error: "Confirm Password is empty" },
        { status: 400 }
      );
    } else if (password !== confirm_password) {
      return NextResponse.json(
        { error: "Password does not match" },
        { status: 400 }
      );
    } else if (!terms_conditions) {
      return NextResponse.json(
        { error: "You must accept terms and conditions" },
        { status: 400 }
      );
    } else if (existingEmployer) {
      return NextResponse.json(
        { error: "Employer Already Exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const employer = await prisma.company.create({
      data: {
        name: your_name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "Employer registered successfully", employer }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
