/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// File: pages/Books.tsx
import { useEffect, useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation, useUpdateBookMutation } from "@/redux/services/bookApi";
import { useBorrowBookMutation } from "@/redux/services/borrowApi";
import type { IBook } from "@/types";

import { Button } from "@/components/ui/button";
import BookFilters from "@/components/books/BookFilters/BookFilters";
import BookTable from "@/components/books/BookTable";
import EditBookDialog from "@/components/books/EditBookDialog";
import BorrowBookDialog from "@/components/books/BorrowBookDialog";
import ConfirmDeleteDialog from "@/components/books/ConfirmDeleteDialog";
import StatusDialog from "@/components/books/StatusDialog";
import Title from "@/components/header/Title";

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

    const handleBorrow = async (data: { quantity: number; dueDate: string }) => {
        if (!borrowBookTarget) return;
        const availableCopies = borrowBookTarget.copies;
        if (data.quantity > availableCopies) {
            setDialogMessage("Not enough copies available.");
            setShowErrorDialog(true);
            return;
        }

        try {
            await borrowBook({ book: borrowBookTarget._id, ...data }).unwrap();
            setDialogMessage("Book borrowed successfully!");
            setShowSuccessDialog(true);
            setBorrowBookTarget(null);
            refetch();
        } catch (err: any) {
            setDialogMessage(err?.data?.message || "Failed to borrow book.");
            setShowErrorDialog(true);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Title title={"All Books"}/>
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
                <div className="text-center">
                    <div role="status">
                        {/* spinner SVG */}
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <div>Loading...</div>
                    </div>
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
