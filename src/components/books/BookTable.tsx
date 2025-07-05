import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { IBook } from "@/types";
import { Link } from "react-router";

type Props = {
    books: IBook[];
    onEdit: (book: IBook) => void;
    onDelete: (book: IBook) => void;
    onBorrow: (book: IBook) => void;
};

const BookTable = ({ books, onEdit, onDelete, onBorrow }: Props) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Copies</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {books.map((book) => (
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
                        <Link to={`/books/${book._id}`} className="text-blue-600 hover:underline font-medium">
                            <Button>Details</Button>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onEdit(book)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onDelete(book)}>Delete</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onBorrow(book)} disabled={!book.available}>
                                    Borrow
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

export default BookTable;
