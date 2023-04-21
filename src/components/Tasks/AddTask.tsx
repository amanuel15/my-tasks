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
} from "@mui/material";
import { Add } from "@mui/icons-material";

import { CreateTaskType } from "../../types";

const AddTask: FC<{ createTask: (task: CreateTaskType) => void }> = ({
  createTask,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask({
      title,
      description,
    });
    setTitle("");
    setDescription("");
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
            Add a new Task
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
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
              type="submit"
            >
              <Add />
              Add
            </Button>
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
          Successfully added task!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddTask;
