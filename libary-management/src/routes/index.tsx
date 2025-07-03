import App from "@/App";
import Book from "@/pages/Book";
import User from "@/pages/User";
import {
  createBrowserRouter,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
        {
            path: "user",
            Component: User
        },
        {
            path: "book",
            Component: Book
        }
    ]
  },
]);

export default router;