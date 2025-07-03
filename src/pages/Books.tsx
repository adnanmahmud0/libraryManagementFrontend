

import { useGetBooksQuery } from "@/redux/services/bookApi";
import type { IBook } from "@/types";


const Books = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <p className="text-center mt-10">Loading books...</p>;
  if (isError) return <p className="text-red-500 mt-10 text-center">Failed to load books.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📚 All Books</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Genre</th>
              <th className="py-2 px-4 border-b">ISBN</th>
              <th className="py-2 px-4 border-b">Copies</th>
              <th className="py-2 px-4 border-b">Available</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book: IBook) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b">{book.genre}</td>
                <td className="py-2 px-4 border-b">{book.isbn}</td>
                <td className="py-2 px-4 border-b">{book.copies}</td>
                <td className="py-2 px-4 border-b">
                  {book.available ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Borrow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
