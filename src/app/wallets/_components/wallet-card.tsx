// Import necessary modules and components
import Link from "next/link";
import { WalletDto } from "@/app/_api-types/wallets";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

// Define the props interface for the WalletCard component
interface WalletCardProps {
  wallet: WalletDto;
  searchQuery: string;
}

// Define and export the WalletCard component
export const WalletCard = ({ wallet, searchQuery }: WalletCardProps) => {
  return (
    // Link to the wallet's detail page
    <Link href={`/wallets/${wallet.address}`}>
      <div className="bg-gray-50 p-4 px-6 rounded-lg hover:bg-gray-100 transition-colors flex justify-between items-start cursor-pointer">
        {/* Display the wallet address with highlighted search query */}
        <div
          className="text-sm break-all mr-4"
          dangerouslySetInnerHTML={{
            __html: wallet.address.replace(
              new RegExp(searchQuery, "gi"),
              (match) => `<span class="bg-blue-300">${match}</span>`
            ),
          }}
        />

        {/* Display the wallet's currency icon or symbol */}
        <div className="w-12 rounded-full hidden sm:block flex-shrink-0">
          <AspectRatio ratio={1}>
            {wallet.currency?.iconImg ? (
              <Image
                src={wallet.currency?.iconImg}
                alt={wallet.currency?.symbol}
                className="object-fit"
                sizes="48px"
                fill
              />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 bg-black text-white rounded-full">
                {wallet.currency?.symbol}
              </div>
            )}
          </AspectRatio>
        </div>
      </div>
    </Link>
  );
};
