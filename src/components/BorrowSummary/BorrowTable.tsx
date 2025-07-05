// components/BorrowTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBorrowSummary } from "@/types";

interface Props {
  data: IBorrowSummary[];
  startIndex: number;
}

const BorrowTable = ({ data, startIndex }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Book Title</TableHead>
          <TableHead>ISBN</TableHead>
          <TableHead>Total Borrowed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={startIndex + index}>
            <TableCell>{startIndex + index + 1}</TableCell>
            <TableCell>{item.book.title}</TableCell>
            <TableCell>{item.book.isbn}</TableCell>
            <TableCell>{item.totalQuantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BorrowTable;
