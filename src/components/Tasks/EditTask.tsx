import { FC, useState } from "react";
import {
  FormControl,
  Container,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { EditTaskType, TaskType } from "../../types";
import { STATUSES } from "../../constants";

const EditTask: FC<{
  id: string;
  editTask: (id: string, task: EditTaskType) => void;
  getTask: (id: string) => TaskType;
}> = ({ id, editTask, getTask }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const task = getTask(id);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<STATUSES>(task.status);
  const [open, setOpen] = useState(false);
  console.log("Task: ", task);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTask(id, {
      title,
      description,
      status,
    });
    if (title.trim()) setOpen(true);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={submit} className="add-todo">
          <Typography
            variant={isSmallScreen ? "h6" : "h4"}
            style={{ fontWeight: "bold" }}
            gutterBottom
          >
            Edit Task
          </Typography>
          <FormControl fullWidth={true}>
            <TextField
              label="Title"
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
              required={true}
              value={title}
            />
            <TextField
              label="Description"
              variant="filled"
              onChange={(e) => setDescription(e.target.value)}
              //   required={true}
              value={description}
              style={{ marginTop: 15 }}
              multiline
              rows={10}
            />
            {/* <InputLabel>Status</InputLabel> */}
            <Select
              value={status}
              variant="filled"
              onChange={(e) => setStatus(e.target.value as STATUSES)}
              sx={{ marginTop: 1 }}
            >
              {task.nextSteps.map((step) => (
                <MenuItem value={step}>{step}</MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 3,
              }}
              gap={2}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ flex: 1, py: 1.5 }}
              >
                <Edit />
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(-1)}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        </form>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          // icon={<Check fontSize="inherit" />}
          elevation={6}
          variant="filled"
          onClose={() => setOpen(false)}
          severity="success"
        >
          Successfully updated task!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditTask;
