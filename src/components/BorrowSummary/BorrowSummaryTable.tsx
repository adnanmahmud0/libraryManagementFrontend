// src/components/BorrowSummaryTable.tsx
import { useGetBorrowSummaryQuery } from "@/redux/services/borrowApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BorrowSummaryTable = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load borrow summary.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Borrowed Books Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all borrowed books with quantities.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.book.title}</TableCell>
                <TableCell>{item.book.isbn}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BorrowSummaryTable;
