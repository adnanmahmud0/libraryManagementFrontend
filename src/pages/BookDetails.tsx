/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/header/Title";
import { useGetBookByIdQuery } from "@/redux/services/bookApi";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import BookDetailsCard from "@/components/BookDetails/BookDetailsCard";


const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError, error } = useGetBookByIdQuery(id || "");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-600 mt-20">
                <h2 className="text-xl font-semibold">Error fetching book details</h2>
                <p>{(error as any)?.data?.message || "Something went wrong."}</p>
            </div>
        );
    }

    const book = data?.data;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <Title title="Book Details" />
            <BookDetailsCard book={book} />
        </div>
    );
};

export default BookDetails;
