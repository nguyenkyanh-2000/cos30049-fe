import React from "react";
import Header from "@/app/_components/section-header";
import Footer from "@/app/_components/section-footer";
import SectionWalletDetails from "@/app/wallets/[address]/_components/section-wallet";
import { notFound } from "next/navigation";
import { SuccessGetWalletDetailsResponse } from "@/app/_api-types/wallets";

// Async function to fetch and display wallet details
async function WalletDetailsPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  // Extract wallet address from params
  const { address } = await params;

  // Fetch wallet details from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wallets/${address}/details`
  );

  // If the response is not OK, show 404 page
  if (!res.ok) {
    notFound();
  }

  // Parse the response JSON
  const walletData: SuccessGetWalletDetailsResponse = await res.json();

  // If wallet data is not found, show 404 page
  if (!walletData.data) {
    notFound();
  }

  // Render the wallet details page
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <SectionWalletDetails data={walletData.data} />
      <Footer />
    </main>
  );
}

export default WalletDetailsPage;
