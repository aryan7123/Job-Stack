"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const companyLogo = formData.get("companyLogo") as File | null;
    const employerId = formData.get("employerId") as string;

    const updateData: any = {};

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    if (name || email) {
      await prisma.company.update({
        where: { id: employerId },
        data: {
          ...(name && { name }),
          ...(email && { email }),
        },
      });
    }

    let fileUrl: string | undefined = undefined;
    if (companyLogo) {
      const timestamp = Date.now();
      const extension = path.extname(companyLogo.name);
      const fileName = `employer_${timestamp}${extension}`;

      const assetsDir = path.join(
        process.cwd(),
        "public",
        "assets",
        "employer",
        "logo"
      );
      const filePath = path.join(assetsDir, fileName);

      if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
      }

      const arrayBuffer = await companyLogo.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);

      fileUrl = `/assets/employer/logo/${fileName}`;
      updateData.companyLogo = fileUrl;
    }

    const industry = formData.get("industry") as string | null;
    const companySize = formData.get("companySize") as string | null;
    const yearFounded = formData.get("yearFounded") as string | null;
    const founder = formData.get("founder") as string | null;
    const headquarters = formData.get("headquarters") as string | null;
    const website = formData.get("website") as string | null;
    const description = formData.get("description") as string | null;
    const specialties = formData.getAll("specialties") as string[];

    if (industry) updateData.industry = industry;
    if (companySize) updateData.companySize = companySize;
    if (yearFounded) updateData.yearFounded = yearFounded;
    if (founder) updateData.founder = founder;
    if (headquarters) updateData.headquarters = headquarters;
    if (website) updateData.website = website;
    if (description) updateData.description = description;
    if (specialties.length > 0) updateData.specialties = specialties;

    const existingEmployer = await prisma.company.findUnique({
      where: { id: employerId },
    });

    let employer;
    if (existingEmployer) {
      employer = await prisma.company.update({
        where: { id: employerId },
        data: updateData,
      });
    } else {
      employer = await prisma.company.create({
        data: {
          ...updateData,
        },
      });
    }

    return NextResponse.json({
      employer,
      message: "Employer Details Updated Successfully",
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
