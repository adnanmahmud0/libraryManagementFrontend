import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGetBooksQuery, useDeleteBookMutation, useUpdateBookMutation } from "@/redux/services/bookApi";
import type { IBook } from "@/types";
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Initialize SweetAlert with React content support
const MySwal = Swal;

const Books = () => {
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sort, setSort] = useState("desc");
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const { data: response, isLoading, isError, refetch } = useGetBooksQuery({
        filter: filter === "all" ? "" : filter,
        sortBy,
        sort,
        limit,
        page
    });

    const books = response?.data || [];

    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    useEffect(() => {
        setPage(1);
    }, [filter, sortBy, sort, limit]);

    const handleDelete = async () => {
        if (!bookToDelete) return;
        try {
            await deleteBook(bookToDelete._id).unwrap();
            setBookToDelete(null);
            setDialogMessage(`"${bookToDelete.title}" has been deleted.`);
            setShowSuccessDialog(true);
            refetch();
        } catch (error) {
            console.error("Delete failed:", error);
            setDialogMessage(`Failed to delete "${bookToDelete.title}".`);
            setShowErrorDialog(true);
        }
    };


    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [formData, setFormData] = useState({ title: "", author: "", genre: "", isbn: "", copies: 1 });

    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

    const handleEdit = (book: IBook) => {
        setSelectedBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            copies: book.copies,
        });
        setOpenEditDialog(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async () => {
        if (!selectedBook) return;
        try {
            await updateBook({ id: selectedBook._id, data: formData }).unwrap();
            setOpenEditDialog(false);
            setDialogMessage("Book updated successfully!");
            setShowSuccessDialog(true);
            setSelectedBook(null);
            refetch();
        } catch (error) {
            console.error("Update failed", error);
            setDialogMessage("Failed to update book.");
            setShowErrorDialog(true);
        }

    };



    const handleBorrow = (book: IBook) => {
        MySwal.fire(`Borrow book: ${book.title} (Implement your borrow logic here)`);
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl text-center font-bold">All Books</h1>

                {/* Filters */}
                <div className="grid grid-cols-2 md:flex gap-4 justify-center my-6">
                    {/* Genre Filter */}
                    <Select onValueChange={setFilter} value={filter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="All Genres" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Genres</SelectItem>
                            <SelectItem value="FANTASY">Fantasy</SelectItem>
                            <SelectItem value="SCI-FI">Sci-Fi</SelectItem>
                            <SelectItem value="ROMANCE">Romance</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Sort By */}
                    <Select onValueChange={setSortBy} value={sortBy}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt">Created At</SelectItem>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="copies">Copies</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Sort Order */}
                    <Select onValueChange={setSort} value={sort}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Order" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">Descending</SelectItem>
                            <SelectItem value="asc">Ascending</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Limit */}
                    <Select onValueChange={(val) => setLimit(Number(val))} value={limit.toString()}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Items Per Page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 per page</SelectItem>
                            <SelectItem value="10">10 per page</SelectItem>
                            <SelectItem value="20">20 per page</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

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
                        <Table>
                            <TableCaption>A list of all books in the library</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Genre</TableHead>
                                    <TableHead>ISBN</TableHead>
                                    <TableHead>Copies</TableHead>
                                    <TableHead>Available</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {books?.map((book: IBook) => (
                                    <TableRow key={book._id}>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell>{book.isbn}</TableCell>
                                        <TableCell>{book.copies}</TableCell>
                                        <TableCell>
                                            {book.available ? (
                                                <span className="text-green-600 font-semibold">Yes</span>
                                            ) : (
                                                <span className="text-red-600 font-semibold">No</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEdit(book)}>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setBookToDelete(book)}>
                                                        Delete
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleBorrow(book)}>
                                                        Borrow
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
            </div>
            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                        <DialogDescription>Update the book details and save changes.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                        />
                        <Input
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Author"
                        />
                        <Input
                            name="genre"
                            value={formData.genre}
                            onChange={handleInputChange}
                            placeholder="Genre"
                        />
                        <Input
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleInputChange}
                            placeholder="ISBN"
                        />
                        <Input
                            name="copies"
                            type="number"
                            value={formData.copies}
                            onChange={handleInputChange}
                            placeholder="Copies"
                        />
                        <Button onClick={handleUpdateSubmit} disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Update Book"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete "{bookToDelete?.title}"?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Are you sure you want to delete this book?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Success Dialog */}
            <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Success</AlertDialogTitle>
                        <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Error Dialog */}
            <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Error</AlertDialogTitle>
                        <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setShowErrorDialog(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </>
    );
};

export default Books;
