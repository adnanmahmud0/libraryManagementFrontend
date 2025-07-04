import App from "@/App";
import AddBook from "@/pages/AddBook";
import Books from "@/pages/Books";
import BorrowSummary from "@/pages/BorrowSummary";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "books",
        Component: Books
      },
      {
        path: "add-book",
        Component: AddBook
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary
      }
    ]
  },
]);

export default router;