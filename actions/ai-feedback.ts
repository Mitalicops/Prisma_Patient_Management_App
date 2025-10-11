"use server";

import { db } from "@/lib/db";
import { aiReportSchema } from "@/lib/validation";
import { AIReport } from "@/types";
import { createXai, xai } from "@ai-sdk/xai";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { parseStringify } from "@/lib/utils";

export async function analyzeBloodTestReport(
  bloodTestId: string
): Promise<AIReport | null> {
  try {
    const bloodTest = await db.bloodTest.findFirst({
      where: { id: bloodTestId },
    });

    if (!bloodTest) {
      throw new Error("Blood test not found");
    }

    console.log("The blood test report in backend:", bloodTest);

    const prompt = `
You are a medical AI specialized in analyzing blood test reports.

Based on the following raw blood test data, provide a structured, easy-to-understand report for the patient in this JSON format:

{
  "summary": "Brief explanation of overall health findings (no more than 3 lines)",
  "abnormalFindings": [
    {
      "parameter": "Name of the test parameter (e.g. Hemoglobin)",
      "value": "Value from the blood test with units (e.g. 10.2 g/dL)",
      "normalRange": "Expected reference range (e.g. 13.5–17.5 g/dL)",
      "interpretation": "Explain if the value is high or low and what it could mean (avoid medical jargon)"
    }
  ],
  "recommendations": [
    "Medical follow-ups, further tests, or specialist referrals (if any)"
  ],
  "lifestyleAdvice": [
    "Clear health tips or suggestions like exercise, diet, hydration"
  ]
}

Only respond with valid JSON. Avoid markdown. Be accurate, concise, and patient-friendly.

Here is the blood test data to analyze:
${JSON.stringify(bloodTest, null, 2)}
`;

    const google = createGoogleGenerativeAI({
      // custom settings
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const model = google(
      "gemini-2.0-flash"
      // structuredOutputs: false,
    );

    const { object: aiReport } = await generateObject({
      model,
      prompt,
      schema: aiReportSchema,
    });

    await db.aIReport.create({
      data: {
        //bloodTest: { connect: { id: bloodTest.id } }, // Connect to the existing blood test
        bloodTestId: bloodTest.id,
        content: aiReport,
      },
    });

    await db.bloodTest.update({
      where: { id: bloodTest.id },

      data: {
        feedbackLocked: true, // Lock the feedback after analysis
      },
    });

    return aiReport;
  } catch (error) {
    console.error("Error analyzing blood test report:", error);
    return null;
  }
}

export async function getAIReport(bloodTestId: string) {
  try {
    const data = await db.aIReport.findUnique({
      where: { bloodTestId: bloodTestId },
    });

    if (!data) {
      return null; // No AI report found for this blood test
    }

    return data;
  } catch (error) {
    console.error("Error fetching AI report:", error);
    return null;
  }
}
