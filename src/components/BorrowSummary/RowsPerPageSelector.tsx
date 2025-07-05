// components/RowsPerPageSelector.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  itemsPerPage: number;
  onChange: (value: string) => void;
}

const RowsPerPageSelector = ({ itemsPerPage, onChange }: Props) => {
  return (
    <div className="mb-4 flex justify-end items-center gap-2">
      <Label htmlFor="rows-per-page" className="text-sm">
        Rows per page:
      </Label>
      <Select value={String(itemsPerPage)} onValueChange={onChange}>
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
  );
};

export default RowsPerPageSelector;
