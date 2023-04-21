import { useContext } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import EditTask from "../components/Tasks/EditTask";
import { MainContext } from "../context/MainContext";
import AppBar from "../components/AppBar";

const Edit = () => {
  const { id } = useParams();
  const { editTask, getTask } = useContext(MainContext)!;
  console.log("Prams: ", id);
  return (
    <>
      <AppBar routes={["Task Management", "Edit"]} />
      <Container maxWidth="md">
        <EditTask id={id!} editTask={editTask} getTask={getTask} />
      </Container>
    </>
  );
};

export default Edit;
