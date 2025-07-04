import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { BookFilterProps } from "@/types";
import {
    genreOptions,
    sortByOptions,
    sortOrderOptions,
    limitOptions,
} from "../../../constants/filterOptions";


const BookFilters = ({
    filter,
    sortBy,
    sort,
    limit,
    onFilterChange,
    onSortByChange,
    onSortChange,
    onLimitChange,
}: BookFilterProps) => {
    return (
        <div className="grid grid-cols-2 md:flex gap-4 justify-center my-6">
            <Select onValueChange={onFilterChange} value={filter}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                    {genreOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={onSortByChange} value={sortBy}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    {sortByOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={onSortChange} value={sort}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                    {sortOrderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={(val) => onLimitChange(Number(val))}
                value={limit.toString()}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Items Per Page" />
                </SelectTrigger>
                <SelectContent>
                    {limitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default BookFilters;
