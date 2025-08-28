"use server";

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const userId = formData.get("userId") as string;
    const twitter = formData.get("twitter") as string;
    const instagram = formData.get("instagram") as string;
    const linkedin = formData.get("linkedin") as string;
    const facebook = formData.get("facebook") as string;

    const updateData: any = {};

    if (twitter) updateData.twitter = twitter;
    if (instagram) updateData.instagram = instagram;
    if (linkedin) updateData.linkedin = linkedin;
    if (facebook) updateData.facebook = facebook;

    let candidate;
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      candidate = await prisma.profile.update({
        where: { userId },
        data: updateData,
      });
    } else {
      candidate = await prisma.profile.create({
        data: {
          user: { connect: { id: userId } },
          ...updateData,
        },
      });
    }

    return NextResponse.json({
      candidate,
      message: "Socials Links Updated Successfully",
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
