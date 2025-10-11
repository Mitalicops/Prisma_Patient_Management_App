import { NextResponse } from "next/server";
import { analyzeBloodTestReport } from "@/actions/ai-feedback";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("THE BODY:", body);
  const result = await analyzeBloodTestReport(body.bloodTestId);

  return NextResponse.json(JSON.stringify(result), {
    status: result ? 200 : 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
