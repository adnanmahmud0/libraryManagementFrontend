import App from "@/App";
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
        }
    ]
  },
]);

export default router;