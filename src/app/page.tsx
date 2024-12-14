import React from "react";
import Header from "./_components/section-header";
import Hero from "./_components/section-hero";
import CompaniesList from "./_components/section-companies-list";
import MockAnalysis from "./_components/section-mock-analysis";
import SectionCTA from "./_components/section-features";

async function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <div className="flex flex-col gap-40 mt-10 mb-10">
        <CompaniesList />
        <MockAnalysis />
        <SectionCTA />
      </div>
    </main>
  );
}

export default Page;
