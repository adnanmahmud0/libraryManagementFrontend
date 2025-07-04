import { useState } from "react";
import { useGetBorrowSummaryQuery } from "@/redux/services/borrowApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const BorrowSummaryTable = () => {
    const { data, isLoading, isError } = useGetBorrowSummaryQuery();

    // Pagination state
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
        setCurrentPage(1); // Reset to first page
    };

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
            <CardContent>
                <div className="mb-4 flex justify-end items-center gap-2">
                    <Label htmlFor="rows-per-page" className="text-sm">
                        Rows per page:
                    </Label>
                    <Select
                        value={String(itemsPerPage)}
                        onValueChange={handleItemsPerPageChange}
                    >
                        <SelectTrigger id="rows-per-page" className="w-[100px]">
                            <SelectValue placeholder="Rows" />
                        </SelectTrigger>
                        <SelectContent>
                            {[5, 10, 15, 20].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                    {num}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
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
                        {paginatedData.map((item, index) => (
                            <TableRow key={startIndex + index}>
                                <TableCell>{startIndex + index + 1}</TableCell>
                                <TableCell>{item.book.title}</TableCell>
                                <TableCell>{item.book.isbn}</TableCell>
                                <TableCell>{item.totalQuantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Showing range info */}
                <div className="mt-2 text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {endIndex} of {totalItems} items
                </div>

                {/* Pagination controls */}
                <div className="mt-4 flex justify-between items-center">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </Button>

                    <div className="space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BorrowSummaryTable;
