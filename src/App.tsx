import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import { Box, Container } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

function App() {
  return (
    <Box sx={{ height: "100vh" }}>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
