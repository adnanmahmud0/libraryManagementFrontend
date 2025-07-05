import App from "@/App";
import AddBook from "@/pages/AddBook";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Books
      },
      {
        path: "add-book",
        Component: AddBook
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary
      },
      {
        path: "/books/:id",
        Component: BookDetails
      }
    ]
  },
]);

export default router;