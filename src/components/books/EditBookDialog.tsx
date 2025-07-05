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
import { Label } from "../ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: IBook | null;
  onUpdate: (data: { title: string; description: string; author: string; genre: string; isbn: string; copies: number }) => Promise<void>;
  isLoading: boolean;
}

const EditBookDialog = ({ open, onOpenChange, book, onUpdate, isLoading }: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        description: book.description,
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
          <Label htmlFor="title">Title</Label>
          <Input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
          <Label htmlFor="description">Description</Label>
          <Input name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
          <Label htmlFor="author">Author</Label>
          <Input name="author" value={formData.author} onChange={handleInputChange} placeholder="Author" />
          <Label htmlFor="genre">Genre</Label>
          <Input name="genre" value={formData.genre} onChange={handleInputChange} placeholder="Genre" />
          <Label htmlFor="isbn">ISBN</Label>
          <Input name="isbn" value={formData.isbn} onChange={handleInputChange} placeholder="ISBN" />
          <Label htmlFor="copies">Copies</Label>
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
