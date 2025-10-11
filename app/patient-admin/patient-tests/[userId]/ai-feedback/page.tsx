import { getAIReport } from "@/actions/ai-feedback";
import AIFeedbackUI from "@/components/Patient-Admin-table/AI-feedbackUI";
import { AIReport } from "@/types";
import React from "react";

const AIFeedbackPage = async ({ params }: { params: { userId: string } }) => {
  const data = await getAIReport(params.userId);

  console.log("AI Feedback Data:", data);
  return (
    <div className="p-[5%] grid grid-cols-1 max-[450px]:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] h-[100vh] gap-4">
      {data?.content ? (
        <AIFeedbackUI data={data.content as AIReport} />
      ) : (
        <div>No AI feedback available.</div>
      )}
    </div>
  );
};

export default AIFeedbackPage;
