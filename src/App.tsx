import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Task from "./pages/Task";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/task",
    element: <Task />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
