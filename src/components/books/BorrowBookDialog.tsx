
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
import { useNavigate } from "react-router";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: IBook | null;
  onBorrow: (data: { quantity: number; dueDate: string }) => Promise<void>;
  isLoading: boolean;
}

const BorrowBookDialog = ({ open, onOpenChange, book, onBorrow, isLoading }: Props) => {
  const [formData, setFormData] = useState({ quantity: 1, dueDate: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      const today = new Date().toISOString().split("T")[0];
      setFormData({ quantity: 1, dueDate: today });
    }
  }, [book]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await onBorrow(formData);
      navigate("/borrow-summary");
    } catch (error) {
      console.error("Borrow failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>Enter quantity and due date for borrowing this book.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            type="number"
            name="quantity"
            min={1}
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <Input
            type="date"
            name="dueDate"
            placeholder="Due Date"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookDialog;

