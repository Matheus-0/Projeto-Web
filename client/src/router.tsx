import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Tasks from "./pages/tasks";

import { RequireAuth, RequireNoAuth } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireNoAuth>
        <Home />
      </RequireNoAuth>
    ),
  },
  {
    path: "/tasks",
    element: (
      <RequireAuth>
        <Tasks />
      </RequireAuth>
    ),
  }
]);

export default router;