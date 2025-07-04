import App from "@/App";
import AddBook from "@/pages/AddBook";
import Books from "@/pages/Books";

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
      }
    ]
  },
]);

export default router;