import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import { Box } from "@mui/material";

const router = createHashRouter([
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
