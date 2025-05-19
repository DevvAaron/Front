import React from "react";
import { Box, Typography, Zoom } from "@mui/material";
import Img from "../../assets/Grupousuarios.png";
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
      <img src={Img} alt="" fontSize="large" />
      <Zoom in={checked} timeout={1000}>
        <Typography variant="h3" sx={{ margin:2 ,fontWeight: "bold",color: "any"}}>
          PANEL DE USUARIOS
        </Typography>
      </Zoom>
      <img src={Img} alt="" fontSize="large" />
    </Box>
  );
};

export default UsuariosInicio;
