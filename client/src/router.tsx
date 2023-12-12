import { createBrowserRouter } from "react-router-dom";

import Admin from "./pages/admin";
import About from "./pages/about";
import Contact from "./pages/contact";
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
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <Admin />
      </RequireAuth>
    ),
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about-us",
    element: <About />,
  }
]);

export default router;
