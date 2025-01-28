"use client";

import { TransactionDto } from "@/app/_api-types/transactions";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";
import { TransactionDetailDialog } from "../transaction-detail-dialog";

export const transactionsTableColumn: ColumnDef<TransactionDto>[] = [
  {
    accessorKey: "value",
    id: "value",

    size: 150,
    header: () => <span className="font-bold">Value</span>,
  },
  {
    accessorFn: (row) => row.hash,
    id: "transactionHash",
    size: 400,
    header: () => <span className="font-bold">Transaction Hash</span>,
  },
  {
    accessorFn: (row) => row.destinationWallet?.address,
    id: "destinationAddress",
    size: 300,
    header: () => <span className="font-bold">Destination Address</span>,
  },
  {
    id: "actions",
    size: 60,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.hash)}
            >
              Copy transaction hash
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/wallets/${transaction.destinationWallet?.address}`}>
                View destination wallet
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <TransactionDetailDialog transaction={transaction}>
                <span className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                  View transaction
                </span>
              </TransactionDetailDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
