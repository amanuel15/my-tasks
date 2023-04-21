import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import { Container } from "@mui/material";

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
    <Container maxWidth="md" style={{ height: "100vh" }}>
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
