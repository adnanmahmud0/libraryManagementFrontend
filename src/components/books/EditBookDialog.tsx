// File: components/EditBookDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IBook } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: IBook | null;
  onUpdate: (data: { title: string; author: string; genre: string; isbn: string; copies: number }) => Promise<void>;
  isLoading: boolean;
}

const EditBookDialog = ({ open, onOpenChange, book, onUpdate, isLoading }: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
      });
    }
  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    await onUpdate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>Update the book details and save changes.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
          <Input name="author" value={formData.author} onChange={handleInputChange} placeholder="Author" />
          <Input name="genre" value={formData.genre} onChange={handleInputChange} placeholder="Genre" />
          <Input name="isbn" value={formData.isbn} onChange={handleInputChange} placeholder="ISBN" />
          <Input
            name="copies"
            type="number"
            min={1}
            value={formData.copies}
            onChange={handleInputChange}
            placeholder="Copies"
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Book"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
