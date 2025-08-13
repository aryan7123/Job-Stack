"use server";

import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = new InferenceClient(process.env.HF_TOKEN);
    const imageBlob = await client.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: body.prompt,
      parameters: { num_inference_steps: 5 }
    });

    const fileName = `avatar-${Date.now()}.png`;
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a unique filename
    const assetsDir = path.join(process.cwd(), "public", "assets", "avatar");
    const filePath = path.join(assetsDir, fileName);
    const fileUrl = `/assets/avatar/${fileName}`;

    // // Save file in /public
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ image: fileUrl, message: "Avatar Image Generated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something Went Wrong" }, { status: 400 });
  }
}
