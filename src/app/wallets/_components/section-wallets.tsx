"use client";

// Import necessary components and hooks
import { CircleHelp, LoaderCircle, Search, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { SuccessGetWalletsResponse, WalletDto } from "@/app/_api-types/wallets";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WalletCard } from "./wallet-card";
import { searchWallet } from "@/actions/wallet/search-wallet";
import { ActionResult } from "@/actions/action.type";

const initialState = {
  success: false,
  message: "",
  payload: null,
};

const SectionWallet = () => {
  // State variables for error message, search query, and wallets list
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wallets, setWallets] = useState<WalletDto[]>([]);

  // Function to handle wallet search
  const searchWallet = async (formData: FormData) => {
    const searchQuery = formData.get("searchQuery") as string;

  //   setSearchQuery(searchQuery);
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/wallets?query=${searchQuery}`
  //   );
  //   const res = await response.json();

  //   if (response.ok) {
  //     const successData: SuccessGetWalletsResponse = res;

  //     if (!successData.data?.wallets) {
  //       return;
  //     }

  //     setWallets(successData.data.wallets);
  //   } else {
  //     const errorData: ErrorGetWalletsResponse = res;
  //     setError(errorData.message || "An error occurred");
  //   }
  // };

  return (
    <section className="container mx-auto px-5 py-12 mt-20 flex flex-col gap-4 items-center">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Find wallet</h1>
        {searchQuery ? (
          <div className="text-center text-gray-500 mt-2">
            {`Found ${wallets.length} wallets for search query "${searchQuery}"`}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">
            Manage your digital assets securely
          </p>
        )}
      </div>

      {/* Search Section */}
      <div className="max-w-2xl w-full">
        <form action={action}>
          <div className="flex gap-1">
            <Input
              type="text"
              placeholder="Search by wallet address"
              name="searchQuery"
              className="w-full rounded-lg border border-gray-300"
            />
            <Button className="flex justify-center items-center" type="submit">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>

      {/* Wallets Display Section */}
      <div className="rounded-xl border p-4 w-full mt-8">
        {error && (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        )}

          {!searchQuery ? (
            <div className="flex flex-col items-center gap-4 h-[400px] justify-center w-full">
              <Wallet className="h-24 w-24 text-gray-500" />
              <p>Search for a wallet to get started</p>
            </div>
          ) : (
            <ScrollArea className="w-full h-[400px]">
              {wallets && wallets.length > 0 && (
                <div className="flex flex-col gap-4">
                  {wallets.map((wallet) => (
                    <WalletCard
                      wallet={wallet}
                      key={wallet.address}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>
              )}

              {searchQuery && wallets.length === 0 && (
                <div className="flex flex-col items-center gap-4 h-[400px] justify-center w-full">
                  <CircleHelp className="h-24 w-24 text-gray-500" />
                  <p>No wallets found</p>
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      )}
    </section>
  );
};

export default SectionWallet;
