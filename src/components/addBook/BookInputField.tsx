import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BookInputFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  min?: number;
}

const BookInputField = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  min,
}: BookInputFieldProps) => (
  <div className="grid gap-2">
    <Label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</Label>
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      min={min}
    />
  </div>
);

export default BookInputField;
