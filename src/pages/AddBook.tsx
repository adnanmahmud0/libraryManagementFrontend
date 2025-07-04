import AddBookForm from "@/components/addBook/AddBookForm";
import Title from "@/components/header/Title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const AddBook = () => {
    return (
        <div className="flex justify-center mt-10 px-4">
            <Card className="w-full max-w-xl mt-20">
                <CardHeader>
                    <Title title="Add Book" />
                </CardHeader>
                <CardContent>
                    <AddBookForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default AddBook;
