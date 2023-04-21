import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { FC, useState } from "react";
import { Edit } from "@mui/icons-material";

import { TaskType } from "../../types";

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
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Task;
