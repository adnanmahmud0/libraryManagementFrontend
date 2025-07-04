/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddBookMutation } from "@/redux/services/bookApi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(formData).unwrap();
      toast.success("Book added successfully!");
      navigate("/books");
    } catch (error: any) {
      toast.error(`${error?.data?.error || "Failed to add book."}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre (e.g., FANTASY)"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Unique ISBN"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="copies">Copies</Label>
        <Input
          id="copies"
          name="copies"
          type="number"
          min="1"
          value={formData.copies}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Book"}
      </Button>
    </form>
  );
};

export default AddBookForm;
