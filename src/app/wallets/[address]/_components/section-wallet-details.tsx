// Import necessary modules and components
import { WalletDetailsDto } from "@/app/_api-types/wallets";
import { Card, CardContent } from "@/components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

// Helper function to calculate days difference between now and a given timestamp
function getDaysAgo(timestamp: Date): number {
  const now = new Date();
  const diffTime = now.getTime() - timestamp.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Define the SectionWalletDetails component
export default function SectionWalletDetails({
  data,
}: {
  data: WalletDetailsDto;
}) {
  // Destructure data object to extract wallet, firstTransaction, and recentTransactions
  const { wallet, firstTransaction, recentTransactions } = data;

  return (
    <div className="flex flex-col gap-4">
      {/* Card for Balance Overview */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Balance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold">{`${wallet?.balance}`}</p>
              <p className="text-sm text-gray-500">{`${wallet?.currency?.name}`}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">First Transaction</p>
              {/* Display first transaction details if available */}
              {firstTransaction ? (
                <>
                  <p className="text-lg font-semibold">
                    {getDaysAgo(new Date(firstTransaction.blockTimestamp))} days
                    ago
                  </p>
                  <p>
                    {format(firstTransaction?.blockTimestamp, "dd MMMM yyyy")}
                  </p>
                </>
              ) : (
                <p className="text-lg font-semibold">No transactions yet</p>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">Wallet type</p>
              <p className="text-2xl font-bold">{`${wallet?.type}`}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card for Recent Activity */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {/* Display recent transactions if available */}
            {recentTransactions && recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.hash}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.sourceWallet?.address === wallet?.address
                          ? "bg-red-100"
                          : "bg-green-100"
                      }`}
                    >
                      {transaction.sourceWallet?.address === wallet?.address ? (
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.sourceWallet?.address === wallet?.address
                          ? "Sent"
                          : "Received"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.sourceWallet?.address === wallet?.address
                          ? `To: ${transaction.destinationWallet?.address?.slice(
                              0,
                              6
                            )}...${transaction.destinationWallet?.address?.slice(
                              -4
                            )}`
                          : `From: ${transaction.sourceWallet?.address?.slice(
                              0,
                              6
                            )}...${transaction.sourceWallet?.address?.slice(
                              -4
                            )}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-medium">
                      {String(transaction.value).slice(0, 6)}...
                      {String(transaction.value).slice(-4)}{" "}
                      {wallet?.currency?.symbol}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {formatDistanceToNow(
                        new Date(transaction.blockTimestamp),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Display message if no recent transactions
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <ArrowDownRight className="h-6 w-6 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900">
                  No Recent Transactions
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  This wallet hasn't made any transactions yet
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
