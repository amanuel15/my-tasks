import { useContext } from "react";

import AddTask from "../components/Tasks/AddTask";
import { MainContext } from "../context/MainContext";
import { Box } from "@mui/material";

const Home = () => {
  const { createTask, tasks } = useContext(MainContext)!;

  return (
    <Box height="100vh">
      <AddTask createTask={createTask} />
    </Box>
  );
};

export default Home;
