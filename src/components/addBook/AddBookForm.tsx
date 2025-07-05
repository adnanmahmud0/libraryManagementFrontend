/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddBookMutation } from "@/redux/services/bookApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import BookInputField from "./BookInputField";
import GenreSelect from "./GenreSelect";
import FormAlertDialog from "./FormAlertDialog";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    genre: "",
    isbn: "",
    copies: 1,
  });

  const [alert, setAlert] = useState({
    open: false,
    type: "success" as "success" | "error",
    message: "",
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
      setAlert({
        open: true,
        type: "success",
        message: "Book added successfully!",
      });
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to add book.");
      setAlert({
        open: true,
        type: "error",
        message: error?.data?.error || "Failed to add book.",
      });
    }
  };

  const handleDialogClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
    if (alert.type === "success") {
      navigate("/", { state: { refetch: true } });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <BookInputField
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
        />
        <BookInputField
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Book Description"
        />
        <BookInputField
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author Name"
        />
        <GenreSelect
          value={formData.genre}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, genre: value }))
          }
        />
        <BookInputField
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Unique ISBN"
        />
        <BookInputField
          id="copies"
          name="copies"
          type="number"
          min={1}
          value={formData.copies}
          onChange={handleChange}
          placeholder="Number of Copies"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Book"}
        </Button>
      </form>

      <FormAlertDialog
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default AddBookForm;
