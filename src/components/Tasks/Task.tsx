import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Modal,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { FC, useState } from "react";
import { Edit } from "@mui/icons-material";

import { TaskType } from "../../types";
import { Link } from "react-router-dom";

const Task: FC<{ task: TaskType }> = ({ task }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      sx={{
        padding: "0.5rem",
        maxWidth: 250,
        minWidth: 175,
        mx: "auto",
        borderRadius: 2,
      }}
      elevation={5}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "1.2rem" }}
          color="text.primary"
          fontWeight="bold"
          gutterBottom
        >
          {task.title}
        </Typography>
        <Typography
          sx={{
            lineHeight: 1.5,
            maxHeight: "4.5em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4, // number of lines to show
            WebkitBoxOrient: "vertical",
          }}
          minHeight={90}
        >
          {task.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ px: 4 }}
          onClick={() => setOpen(true)}
        >
          {task.status}
        </Button>
        <IconButton sx={{ marginLeft: "auto" }}>
          <Link to={`/edit/${task.id}`}>
            <Edit />{" "}
          </Link>
        </IconButton>
      </CardActions>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            maxWidth: 400,
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" marginBottom={2}>
            History
          </Typography>
          <Stepper activeStep={task.history.length} orientation="vertical">
            {[...task.history].reverse().map((step, index) => (
              <Step key={step + index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Modal>
    </Card>
  );
};

export default Task;
