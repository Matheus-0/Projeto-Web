import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";

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
        <></>
      </RequireAuth>
    ),
  }
]);

export default router;