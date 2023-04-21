import { useContext } from "react";

import AddTask from "../components/Tasks/AddTask";
import { MainContext } from "../context/MainContext";
import Task from "../components/Tasks/Task";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const Home = () => {
  const { createTask, tasks } = useContext(MainContext)!;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box height="100vh">
      <AddTask createTask={createTask} />
      {tasks.length ? (
        <Box
          sx={{
            marginTop: "1.5rem",
            backgroundColor: "rgb(23, 117, 185)",
            borderTopRightRadius: "2rem",
            borderTopLeftRadius: "2rem",
            paddingTop: "1rem",
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : "h4"}
            style={{ fontWeight: "bold" }}
            marginLeft={{ xs: 2, sm: 3 }}
            color="white"
          >
            Tasks
          </Typography>
          <Box
            sx={{
              marginTop: "1.5rem",
              backgroundColor: "rgb(162, 206, 237)",
              borderTopRightRadius: "2rem",
              borderTopLeftRadius: "2rem",
            }}
            p={{ xs: 5 }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {tasks.map((task) => (
                <Grid
                  xs={4}
                  sm={4}
                  md={4}
                  key={task.id}
                  justifyContent={"center"}
                >
                  <Task task={task} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default Home;
