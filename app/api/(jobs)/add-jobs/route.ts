"use server";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, employerId } = body;

    if(!employerId) {
      return NextResponse.json(
        { error: "EmployerID is not available" },
        { status: 400 }
      );
    }
    else if (!data.job_title) {
      return NextResponse.json(
        { error: "Job Title is required" },
        { status: 400 }
      );
    } else if (!data.location) {
      return NextResponse.json(
        {
          error: "Job Location is required",
        },
        { status: 400 }
      );
    } else if (!data.job_category) {
      return NextResponse.json(
        {
          error: "Job Category is required",
        },
        { status: 400 }
      );
    } else if (!data.experience) {
      return NextResponse.json(
        {
          error: "Experience is required",
        },
        { status: 400 }
      );
    } else if (!data.qualification) {
      return NextResponse.json(
        {
          error: "Qualifications is required",
        },
        { status: 400 }
      );
    } else if (!data.job_type) {
      return NextResponse.json(
        { error: "Job Type is required" },
        { status: 400 }
      );
    } else if (!data.description) {
      return NextResponse.json(
        {
          error: "Job Description is required",
        },
        { status: 400 }
      );
    } else if (!data.industry) {
      return NextResponse.json(
        { error: "Industry is required" },
        { status: 400 }
      );
    } else if (!data.salary) {
      return NextResponse.json(
        { error: "Salary is required" },
        { status: 400 }
      );
    } else {
      const createJob = await prisma.job.create({
        data: {
          title: data.job_title,
          companyId: employerId,
          location: data.location,
          categories: data.job_category,
          experience: data.experience,
          qualification: data.qualification,
          type: data.job_type,
          industry: data.industry,
          description: data.description,
          salary: data.salary,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Job Posted Successfully",
        job: createJob,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something Went Wrong" },
      { status: 400 }
    );
  }
}
