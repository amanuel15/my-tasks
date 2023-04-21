import { useContext } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import EditTask from "../components/Tasks/EditTask";
import { MainContext } from "../context/MainContext";

const Edit = () => {
  const { id } = useParams();
  const { editTask, getTask } = useContext(MainContext)!;
  console.log("Prams: ", id);
  return (
    <Box height={"100vh"}>
      <EditTask id={id!} editTask={editTask} getTask={getTask} />
    </Box>
  );
};

export default Edit;
