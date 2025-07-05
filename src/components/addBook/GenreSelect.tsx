import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const GenreSelect = ({ value, onChange }: Props) => (
  <div className="grid gap-2">
    <Label htmlFor="genre">Genre</Label>
    <div className="w-full">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          {genreOptions.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default GenreSelect;
