import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";

export default function Navigation() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2f4fb3" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Personal Trainer
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/customers">
            Customers
          </Button>
          <Button color="inherit" component={RouterLink} to="/trainings">
            Trainings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}