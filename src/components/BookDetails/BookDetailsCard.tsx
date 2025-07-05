/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    book: any;
}

const BookDetailsCard = ({ book }: Props) => {
    return (
        <Card className="border shadow-md mt-6">
            <CardHeader>
                <CardTitle className="text-2xl">{book?.title}</CardTitle>
                <CardDescription>{book?.description}</CardDescription>
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
                        className={`text-base ${book?.available ? "text-green-600" : "text-red-600"}`}
                    >
                        {book?.available ? "Available" : "Unavailable"}
                    </p>
                </div>
                <div>
                    <p>Description:</p>
                    <p className="text-base">{book?.description}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookDetailsCard;
