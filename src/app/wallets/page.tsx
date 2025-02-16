// Import necessary modules and components
import React from "react";
import Header from "../_components/section-header";
import Footer from "../_components/section-footer";
import SectionWallet from "./_components/section-wallets";

// Define the WalletPage component
async function WalletPage() {
  return (
    // Main container with minimum height and overflow settings
    <main className="min-h-screen overflow-x-hidden">
      {/* Render the header section */}
      <Header />
      {/* Render the wallet section */}
      <SectionWallet />
      {/* Render the footer section */}
      <Footer />
    </main>
  );
}

// Export the WalletPage component as default
export default WalletPage;
