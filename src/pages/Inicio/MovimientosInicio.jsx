import React from "react";
import { Box, Typography, Zoom } from "@mui/material";
import DriveFileMoveRtlIcon from '@mui/icons-material/DriveFileMoveRtl';
const MovimientosInicio = () => {
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
      <DriveFileMoveRtlIcon fontSize="large"/>
      <Zoom in={checked} timeout={1000}>
        <Typography variant="h3" sx={{ margin:2 ,fontWeight: "bold",color: "any"}}>
          PANEL DE MOVIMIENTOS
        </Typography>
      </Zoom>
      <DriveFileMoveRtlIcon fontSize="large"/>
    </Box>
  );
};

export default MovimientosInicio;
