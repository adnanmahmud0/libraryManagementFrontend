import AddBookForm from "@/components/addBookForm/AddBookForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const AddBook = () => {
  return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBookForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBook;
