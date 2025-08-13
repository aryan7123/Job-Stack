"use server";

import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = new InferenceClient(process.env.HF_TOKEN);
    const imageBlob = await client.textToImage({
      provider: "fal-ai",
      model: "Qwen/Qwen-Image",
      inputs: body.prompt,
      parameters: { num_inference_steps: 5 }
    });

    const fileName = `avatar-${Date.now()}.png`;
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileUrl = `/assets/avatar/${fileName}`;

    return NextResponse.json({ image: fileUrl, message: "Avatar Image Generated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "You have exceeded your monthly included credits for Inference Providers. Subscribe to PRO to get 20x more monthly included credits" }, { status: 400 });
  }
}
