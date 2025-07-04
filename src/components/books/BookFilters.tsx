import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    filter: string;
    sortBy: string;
    sort: string;
    limit: number;
    onFilterChange: (value: string) => void;
    onSortByChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onLimitChange: (value: number) => void;
}

const BookFilters = ({ filter, sortBy, sort, limit, onFilterChange, onSortByChange, onSortChange, onLimitChange }: Props) => {
    return (
        <div className="grid grid-cols-2 md:flex gap-4 justify-center my-6">
            <Select onValueChange={onFilterChange} value={filter}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                    <SelectItem value="SCI-FI">Sci-Fi</SelectItem>
                    <SelectItem value="ROMANCE">Romance</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={onSortByChange} value={sortBy}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="createdAt">Created At</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="copies">Copies</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={onSortChange} value={sort}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(val) => onLimitChange(Number(val))} value={limit.toString()}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Items Per Page" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default BookFilters;
