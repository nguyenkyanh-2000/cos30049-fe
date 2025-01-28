"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SuccessGetWalletTransactionsResponse,
  TransactionDto,
} from "@/app/_api-types/transactions";
import { transactionsTableColumn } from "./transactions-table-columns";
import { DataTablePagination } from "./data-table-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { TransactionDetailDialog } from "../transaction-detail-dialog";

const filterIds = ["transactionHash", "destinationAddress"];

export function TransactionsTable() {
  const { address } = useParams<{ address: string }>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<{
    transactionHash: string;
    destinationAddress: string;
  }>({
    transactionHash: "",
    destinationAddress: "",
  });
  const [data, setData] = useState<{
    transactions: TransactionDto[];
    pageCount: number;
    rowCount: number;
  }>();
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionDto | null>(null);

  const table = useReactTable({
    data: data?.transactions || [],
    rowCount: data?.rowCount || 0,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    columns: transactionsTableColumn,
    getCoreRowModel: getCoreRowModel<TransactionDto>(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSubmitSearchQueries = (formData: FormData) => {
    const newFilters = {
      transactionHash: formData.get("transactionHash") as string,
      destinationAddress: formData.get("destinationAddress") as string,
    };

    setFilters(newFilters);
  };

  const handleRefresh = (id: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: "",
    }));
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const searchParams = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        type: "OUTGOING",
      });

      // Only add filters if they have values
      if (filters.transactionHash) {
        searchParams.append("transactionHash", filters.transactionHash.trim());
      }

      if (filters.destinationAddress) {
        searchParams.append("dstAddress", filters.destinationAddress.trim());
      }

      const url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/wallets/${address}/transactions?${searchParams.toString()}`;

      const res = await fetch(url);

      if (res.ok) {
        const successData: SuccessGetWalletTransactionsResponse =
          await res.json();

        if (!successData.data) {
          return;
        }

        setData({
          transactions: successData.data.transactions,
          pageCount: successData.data.metadata.totalPages,
          rowCount: successData.data.metadata.total,
        });
      }
    };

    fetchTransactions();
  }, [address, pagination, filters]);

  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="h-[400px] w-full border rounded-md">
        <form action={handleSubmitSearchQueries}>
          <Table>
            <TableHeader className="z-10 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          minWidth: header.column.columnDef.size,
                          maxWidth: header.column.columnDef.size,
                        }}
                      >
                        <div className="flex items-center gap-4">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {filterIds.includes(header.id) ? (
                            <>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button type="button">
                                    <Search className="h-4 w-4" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  side="right"
                                  align="start"
                                  className="bg-white p-2 rounded-md shadow-md flex gap-1"
                                >
                                  <Input
                                    type="text"
                                    className="w-48 h-8"
                                    name={header.id}
                                    placeholder="Input here..."
                                  />
                                  <Button type="submit" size={"sm"}>
                                    Search
                                  </Button>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <button
                                type="button"
                                onClick={() => handleRefresh(header.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </button>
                            </>
                          ) : null}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-slate-100"
                    onClick={() => setSelectedTransaction(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          minWidth: cell.column.columnDef.size,
                          maxWidth: cell.column.columnDef.size,
                        }}
                        className="text-ellipsis overflow-hidden"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={transactionsTableColumn.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </form>
      </ScrollArea>

      <DataTablePagination table={table} />
    </div>
  );
}
