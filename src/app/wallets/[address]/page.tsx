import React from "react";
import Header from "@/app/_components/section-header";
import Footer from "@/app/_components/section-footer";
import SectionWalletDetails from "@/app/wallets/[address]/_components/section-wallet";
import { notFound } from "next/navigation";
import { SuccessGetWalletDetailsResponse } from "@/app/_api-types/wallets";

async function WalletDetailsPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wallets/${address}/details`
  );

  if (!res.ok) {
    notFound();
  }

  const walletData: SuccessGetWalletDetailsResponse = await res.json();

  if (!walletData.data) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <SectionWalletDetails data={walletData.data} />
      <Footer />
    </main>
  );
}

export default WalletDetailsPage;
