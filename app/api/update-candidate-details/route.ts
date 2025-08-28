"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const resume = formData.get("resume") as File | null;
    const userId = formData.get("userId") as string;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updateData: any = {};

    // Update user basic info if present
    const your_name = formData.get("your_name") as string | null;
    const email = formData.get("email") as string | null;
    if (your_name || email) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          ...(your_name && { name: your_name }),
          ...(email && { email }),
        },
      });
    }

    // Process resume if present
    let fileUrl: string | undefined = undefined;
    if (resume) {
      const timestamp = Date.now();
      const extension = path.extname(resume.name);
      const fileName = `resume_${timestamp}${extension}`;

      const assetsDir = path.join(process.cwd(), "public", "assets", "resumes");
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await resume.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      fileUrl = `/assets/resumes/${fileName}`;
      updateData.resumeUrl = fileUrl;
    }

    // Collect optional fields
    const occupation = formData.get("occupation") as string | null;
    const location = formData.get("location") as string | null;
    const education = formData.get("education") as string | null;
    const experience = formData.get("experience") as string | null;
    const phone = formData.get("phone") as string | null;
    const website_url = formData.get("website_url") as string | null;
    const description = formData.get("description") as string | null;
    const skills = formData.getAll("skills") as string[];

    if (occupation) updateData.occupation = occupation;
    if (location) updateData.location = location;
    if (education) updateData.education = education;
    if (experience) updateData.experience = experience;
    if (phone) updateData.phoneNumber = phone;
    if (website_url) updateData.website = website_url;
    if (description) updateData.description = description;
    if (skills.length > 0) updateData.skills = skills;

    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    let candidate;
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
      success: true,
      candidate,
      message: "Personal Details Updated Successfully",
    });

  } catch (error) {
    console.log("Update error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
