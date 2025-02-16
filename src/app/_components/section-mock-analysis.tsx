import React from "react";
import MockExpenditureChart from "./mock-expenditure-chart";
import MockTradingVolumeChart from "./mock-trading-volume-chart";
import MockTradingFlowChart from "./mock-trading-flow-chart";

// Component for displaying detailed analysis section
export default async function MockAnalysis() {
  return (
    // Section container with styling
    <section className="flex flex-col gap-20 bg-muted py-10 md:py-32">
      {/* Section title */}
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-center">
        Detailed analysis at your fingertips
      </h2>
      {/* Container for charts */}
      <div className="container mx-auto flex flex-col gap-5 px-5 md:px-8">
        {/* Grid layout for expenditure and trading volume charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-x-5">
          <div className="col-span-1">
            <MockExpenditureChart />
          </div>
          <div className="col-span-2">
            <MockTradingVolumeChart />
          </div>
        </div>
        {/* Trading flow chart spanning the entire row */}
        <div className="row-start-2 row-span-1 col-span-3">
          <MockTradingFlowChart />
        </div>
      </div>
    </section>
  );
}
