// components/BorrowSummaryTable.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useGetBorrowSummaryQuery } from "@/redux/services/borrowApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BorrowTable from "./BorrowTable";
import PaginationControls from "./PaginationControls";
import RowsPerPageSelector from "./RowsPerPageSelector";

const BorrowSummaryTable = () => {
  const location = useLocation();
  const { data, isLoading, isError, refetch } = useGetBorrowSummaryQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const safeData = data ?? [];
  const totalItems = safeData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = safeData.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load borrow summary.</div>;
  }

  return (
    <Card>
      <CardContent>
        <RowsPerPageSelector
          itemsPerPage={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />

        <BorrowTable data={paginatedData} startIndex={startIndex} />

        <div className="mt-2 text-sm text-muted-foreground">
          Showing {startIndex + 1} to {endIndex} of {totalItems} items
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
};

export default BorrowSummaryTable;
