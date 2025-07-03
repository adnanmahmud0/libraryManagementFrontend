import App from "@/App";
import Book from "@/pages/Books";
import { Counter } from "@/pages/Counter";
import User from "@/pages/User";
import { createBrowserRouter } from "react-router";


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
        },
        {
            path: "counter",
            Component: Counter
        }
    ]
  },
]);

export default router;