import TheDashboard from "@/components/DashboardUI/TheDashboard";
import { currentUser } from "@/lib/auth";

import React from "react";

const DocDashboard = async () => {
  const TheDoctor = await currentUser();

  return (
    <section className=" w-full h-screen rounded-md p-4 flex flex-col gap-4 max-sm:p-2 max-sm:gap-2">
    
      <TheDashboard doctor={TheDoctor!} />
    </section>
  );
};

export default DocDashboard;
