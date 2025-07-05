/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: pages/Books.tsx
import { useEffect, useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation, useUpdateBookMutation } from "@/redux/services/bookApi";
import { useBorrowBookMutation } from "@/redux/services/borrowApi";
import type { IBook } from "@/types";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import BookFilters from "@/components/books/BookFilters/BookFilters";
import BookTable from "@/components/books/BookTable";
import EditBookDialog from "@/components/books/EditBookDialog";
import BorrowBookDialog from "@/components/books/BorrowBookDialog";
import ConfirmDeleteDialog from "@/components/books/ConfirmDeleteDialog";
import StatusDialog from "@/components/books/StatusDialog";
import Title from "@/components/header/Title";
import { Skeleton } from "@/components/ui/skeleton";

const Books = () => {
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sort, setSort] = useState("desc");
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [borrowBookTarget, setBorrowBookTarget] = useState<IBook | null>(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const location = useLocation();

    const { data: response, isLoading, isError, refetch } = useGetBooksQuery({
        filter: filter === "all" ? "" : filter,
        sortBy,
        sort,
        limit,
        page,
    });

    const books = response?.data || [];
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

    useEffect(() => {
        setPage(1);
    }, [filter, sortBy, sort, limit]);

    const handleDelete = async () => {
        if (!bookToDelete) return;
        try {
            await deleteBook(bookToDelete._id).unwrap();
            setDialogMessage(`"${bookToDelete.title}" has been deleted.`);
            setShowSuccessDialog(true);
            setBookToDelete(null);
            refetch();
        } catch (error) {
            setDialogMessage(`Failed to delete "${bookToDelete.title}".`);
            setShowErrorDialog(true);
        }
    };

    const handleUpdate = async (data: { title: string; author: string; genre: string; isbn: string; copies: number }) => {
        if (!selectedBook) return;
        try {
            await updateBook({ id: selectedBook._id, data }).unwrap();
            setSelectedBook(null);
            setDialogMessage("Book updated successfully!");
            setShowSuccessDialog(true);
            refetch();
        } catch (error) {
            setDialogMessage("Failed to update book.");
            setShowErrorDialog(true);
        }
    };

    const handleBorrow = async (data: { quantity: number; dueDate: string }): Promise<boolean> => {
        if (!borrowBookTarget) return false;

        const availableCopies = borrowBookTarget.copies;
        if (data.quantity > availableCopies) {
            setDialogMessage("Not enough copies available.");
            setShowErrorDialog(true);
            return false;
        }

        try {
            await borrowBook({ book: borrowBookTarget._id, ...data }).unwrap();
            setDialogMessage("Book borrowed successfully!");
            setShowSuccessDialog(true);
            setBorrowBookTarget(null);
            refetch();
            return true;
        } catch (err: any) {
            setDialogMessage(err?.data?.message || "Failed to borrow book.");
            setShowErrorDialog(true);
            return false;
        }
    };

    useEffect(() => {
        if (location.state?.refetch) {
            refetch();
        }
    }, [location.state]);

    return (
        <div className="container mx-auto p-4">
            <Title title={"All Books"} />
            <BookFilters
                filter={filter}
                sortBy={sortBy}
                sort={sort}
                limit={limit}
                onFilterChange={setFilter}
                onSortByChange={setSortBy}
                onSortChange={setSort}
                onLimitChange={setLimit}
            />

            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : isError ? (
                <p className="text-red-500 mt-10 text-center">Failed to load books.</p>
            ) : (
                <>
                    <BookTable
                        books={books}
                        onEdit={setSelectedBook}
                        onDelete={setBookToDelete}
                        onBorrow={setBorrowBookTarget}
                    />
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span className="font-semibold text-sm px-2">Page {page}</span>
                        <Button
                            variant="outline"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={books.length < limit}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}

            <EditBookDialog
                open={!!selectedBook}
                onOpenChange={() => setSelectedBook(null)}
                book={selectedBook}
                onUpdate={handleUpdate}
                isLoading={isUpdating}
            />

            <BorrowBookDialog
                open={!!borrowBookTarget}
                onOpenChange={() => setBorrowBookTarget(null)}
                book={borrowBookTarget}
                onBorrow={handleBorrow}
                isLoading={isBorrowing}
            />

            <ConfirmDeleteDialog
                open={!!bookToDelete}
                onOpenChange={() => setBookToDelete(null)}
                book={bookToDelete}
                onConfirm={handleDelete}
                isLoading={isDeleting}
            />

            <StatusDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
                title="Success"
                message={dialogMessage}
            />

            <StatusDialog
                open={showErrorDialog}
                onOpenChange={setShowErrorDialog}
                title="Error"
                message={dialogMessage}
            />
        </div>
    );
};

export default Books;
