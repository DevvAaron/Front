import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../../api/axiosConfig";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
  } from '@mui/material';


const RegProducto = () => {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    precio: "",
    stock_actual: "",
  });

  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/productos/registrar", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMensaje({
        open: true,
        text: "Producto registrado correctamente",
        severity: "success",
      });
      setForm({
        nombre: "",
        tipo: "",
        descripcion: "",
        precio: "",
        stock_actual: "",
      });
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al registrar producto",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
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
            select
            fullWidth
            label="Tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="herramienta">Herramienta</MenuItem>
            <MenuItem value="consumible">Consumible</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="precio">Precio</InputLabel>
            <OutlinedInput
              id="precio"
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">S/.</InputAdornment>
              }
              required
            />
          </FormControl>
          <TextField
            fullWidth
            label="Stock actual"
            name="stock_actual"
            type="number"
            value={form.stock_actual}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            REGISTRAR
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={mensaje.open}
        autoHideDuration={4000}
        onClose={() => setMensaje({ ...mensaje, open: false })}
      >
        <Alert
          severity={mensaje.severity}
          onClose={() => setMensaje({ ...mensaje, open: false })}
        >
          {mensaje.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegProducto;
