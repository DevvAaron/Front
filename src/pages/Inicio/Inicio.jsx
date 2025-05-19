import React from "react";
import { Box, Typography, Zoom } from "@mui/material";

const Inicio = () => {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Zoom in={checked} timeout={1000}>
        <Typography variant="h4" sx={{ color: "any" }}>
          Panel de administración de
        </Typography>
      </Zoom>

      <Zoom
        in={checked}
        style={{ transitionDelay: checked ? "600ms" : "0ms" }}
        timeout={1000}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", color: "any", mt: 3 }}
        >
          COBRA SOLUTIONS
        </Typography>
      </Zoom>
    </Box>
  );
};

export default Inicio;
