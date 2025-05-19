import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import axios from "../../api/axiosConfig";

const RegUsuario = () => {
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    telefono: "",
    correo: "",
    password: "",
    rol: "empleado",
  });

  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post("/usuarios/registrar", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMensaje({
        open: true,
        text: "Usuario registrado",
        severity: "success",
      });
      setForm({
        nombre: "",
        dni: "",
        telefono: "",
        correo: "",
        password: "",
        rol: "empleado",
      });
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al registrar usuario",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Registrar Usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="DNI"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Correo"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            select
            fullWidth
            label="Rol"
            name="rol"
            value={form.rol}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="administrador">Administrador</MenuItem>
            <MenuItem value="empleado">Empleado</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Registrar
          </Button>
        </Box>
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

export default RegUsuario;
