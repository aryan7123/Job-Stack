"use server";

import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body.data;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    } else if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    } else if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    } else {
      const employer = await prisma.company.findUnique({
        where: { id: body.employerId },
        select: { comments: true },
      });

      const newCommentData = {
        name,
        email,
        message,
        createdAt: new Date(),
      };

      const currentComments = Array.isArray(employer?.comments)
        ? employer.comments
        : [];

      const updatedComments = [...currentComments, newCommentData];

      const newComment = await prisma.company.update({
        where: { id: body.employerId },
        data: { comments: JSON.parse(JSON.stringify(updatedComments)) }
      });
      
      return NextResponse.json({
        success: true,
        comment: newComment,
        message: "Comment sent successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
