import { AIReport } from "@/types";
import React from "react";

interface AIFeedbackUIProps {
  data: AIReport;
}

const AIFeedbackUI = ({ data }: AIFeedbackUIProps) => {
  return (
    <>
      <div className="p-1 rounded-xl shadow-md bg-orange-300 h-fit">
        <div className="p-4 rounded-xl bg-[#1F2937]">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-green-500">SUMMARY:</h1>

            <p className="leading-loose text-[16px]">{data.summary}</p>
          </div>
        </div>
      </div>
      <div className="p-1 rounded-xl shadow-md bg-indigo-300 h-fit">
        <div className="p-4 rounded-xl bg-[#1F2937]">
          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
            <div>
              <h1 className="text-xl max-[768px]:text-lg font-semibold text-green-500 mb-4">
                ABNORMAL FINDINGS:
              </h1>

              {data.abnormalFindings.length === 0 && (
                <p className="text-green-400">No abnormal findings detected</p>
              )}

              {data.abnormalFindings.map((finding, index) => (
                <p key={index} className="mb-2">
                  {finding.parameter} -{" "}
                  <span className="text-red-400">{finding.value}</span>{" "}
                </p>
              ))}
            </div>

            <div>
              <h1 className="text-xl max-[768px]:text-lg font-semibold text-green-500 mb-4">
                NORMAL RANGE:
              </h1>
              {data.abnormalFindings.length === 0 && (
                <p className="text-green-400">No abnormal findings detected. so no range</p>
              )}
              {data.abnormalFindings.map((finding, index) => (
                <p key={index} className="mb-2">
                  {finding.parameter} -{" "}
                  <span className="text-green-400">{finding.normalRange}</span>{" "}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-1 rounded-xl shadow-md bg-cyan-600 h-fit">
        <div className="p-4 rounded-xl bg-[#1F2937]">
          <div className="">
            <h1 className="text-xl font-semibold text-green-500 mb-3">
              LIFE STYLE ADVICES:
            </h1>
            <div className="flex flex-col gap-2">
              {data.lifestyleAdvice.map((advice, index) => (
                <p key={index} className="text-white leading-loose">
                  • {advice}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-1 rounded-xl shadow-md bg-red-300 h-fit">
        <div className="p-4 rounded-xl bg-[#1F2937]">
          <div className="">
            <h1 className="text-xl font-semibold text-green-500 mb-3">
              FINAL RECOMMENDATIONS:
            </h1>
            <div className="flex flex-col gap-2">
              {data.recommendations.map((recommend, index) => (
                <p key={index} className="text-white leading-loose">
                  • {recommend}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIFeedbackUI;
