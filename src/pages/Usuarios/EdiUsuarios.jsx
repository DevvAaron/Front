import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "../../api/axiosConfig";

const EdiUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const cargarUsuarios = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/usuarios", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsuarios(res.data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSelect = (e) => {
    const user = usuarios.find((u) => u.id === e.target.value);
    setSeleccionado(user);
  };

  const handleChange = (e) => {
    setSeleccionado({ ...seleccionado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/usuarios/${seleccionado.id}`,
        seleccionado,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensaje({
        open: true,
        text: "Usuario actualizado correctamente",
        severity: "success",
      });
      cargarUsuarios();
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al actualizar usuario",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Editar Usuario
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Selecciona un usuario</InputLabel>
          <Select
            value={seleccionado?.id || ""}
            onChange={handleSelect}
            label="Usuario"
          >
            {usuarios.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {seleccionado && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={seleccionado.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="DNI"
              name="dni"
              value={seleccionado.dni}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"
              value={seleccionado.telefono}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Correo"
              name="correo"
              value={seleccionado.correo}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Contraseña nueva"
              name="password"
              type="password"
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Guardar cambios
            </Button>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={mensaje.open}
        autoHideDuration={4000}
        onClose={() => setMensaje({ ...mensaje, open: false })}
      >
        <Alert severity={mensaje.severity}>{mensaje.text}</Alert>
      </Snackbar>
    </Container>
  );
};

export default EdiUsuario;
