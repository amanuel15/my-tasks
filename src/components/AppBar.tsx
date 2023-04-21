import { Abc, Beenhere } from "@mui/icons-material";
import {
  Toolbar,
  Breadcrumbs,
  Typography,
  AppBar as AB,
  Container,
} from "@mui/material";
import { FC } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AppBar: FC<{ routes: string[] }> = ({ routes }) => {
  return (
    <AB position="static" sx={{ marginBottom: 1 }}>
      <Container maxWidth="md">
        <Toolbar>
          <Beenhere />
          <Breadcrumbs
            separator={
              <NavigateNextIcon fontSize="medium" sx={{ color: "white" }} />
            }
            sx={{ ml: "2rem" }}
            aria-label="breadcrumb"
          >
            {routes.map((route) => (
              <Typography variant="h6" color={"white"}>
                {route}
              </Typography>
            ))}
          </Breadcrumbs>
        </Toolbar>
      </Container>
    </AB>
  );
};

export default AppBar;
