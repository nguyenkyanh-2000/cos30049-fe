import { WalletDto } from "@/app/_api-types/wallets";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

export type WalletNodeContextMenuProps = {
  wallet: WalletDto;
} & React.HTMLProps<HTMLDivElement>;

export default function WalletNodeContextMenu({
  wallet,
  ...props
}: WalletNodeContextMenuProps) {
  return (
    <div
      className="bg-white border absolute z-10 w-[200px] m-[15px] rounded-sm p-2 flex flex-col gap-4"
      {...props}
    >
      {/* Address Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">Address</div>
        <div className="text-xs text-gray-500 text-pretty w-[150px] break-words">
          {wallet.address}
        </div>
      </div>

      {/* Type Section */}
      <div className="flex flex-col gap-1">
        <div className="text-sm font-semibold">Type</div>
        <div className="text-xs text-gray-500 text-pretty w-[150px] break-words">
          {wallet.type}
        </div>
      </div>

      {/* Currency Section */}
      {wallet.currency && (
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold">Currency</div>
          <div className="text-xs text-gray-500 text-pretty w-[150px] break-words">
            {wallet.currency.name}
          </div>
        </div>
      )}

      {/* View Wallet Button */}
      <Link href={`/wallets/${wallet.address}`}>
        <Button className="w-full">View Wallet</Button>
      </Link>
    </div>
  );
}
