import React from "react";
import { Box, Typography, Zoom } from "@mui/material";
import SummarizeIcon from '@mui/icons-material/Summarize';
const UsuariosInicio = () => {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{ p: 4, display: "flex", textAlign: "center", alignItems: "center", justifyContent:'center' }}
    >
      <SummarizeIcon />
      <Zoom in={checked} timeout={1000}>
        <Typography variant="h3" sx={{ margin:2 ,fontWeight: "bold",color: "any"}}>
          PANEL DE REPORTES
        </Typography>
      </Zoom>
      <SummarizeIcon />
    </Box>
  );
};

export default UsuariosInicio;
