"use server";

import { db } from "@/lib/db";

export async function getBloodTestData() {
  try {
    const data = await db.bloodTest.findMany({
      orderBy: {
        testDate: "desc",
      },
      include: {
        doctor: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching blood test data:", error);
    return null;
  }
}
