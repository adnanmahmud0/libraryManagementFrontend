/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/BookDetails.tsx

import Title from "@/components/header/Title";
import { useGetBookByIdQuery } from "@/redux/services/bookApi";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

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
            <Card className="border shadow-md mt-6">
                <CardHeader>
                    <CardTitle className="text-2xl">{book?.title}</CardTitle>
                    <CardDescription>Details about the book</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p>Author:</p>
                        <p className="text-base">{book?.author}</p>
                    </div>
                    <div>
                        <p>Genre:</p>
                        <p className="text-base">{book?.genre}</p>
                    </div>
                    <div>
                        <p>ISBN:</p>
                        <p className="text-base">{book?.isbn}</p>
                    </div>
                    <div>
                        <p>Copies:</p>
                        <p className="text-base">{book?.copies}</p>
                    </div>
                    <div>
                        <p>Availability:</p>
                        <p
                            className={`text-base${book?.available ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {book?.available ? "Available" : "Unavailable"}
                        </p>
                    </div>
                    <div>
                        <p >Description:</p>
                        <p className="text-base">{book?.description}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookDetails;
