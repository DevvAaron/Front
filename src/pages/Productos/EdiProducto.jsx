import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
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

const EditarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const cargarProductos = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/productos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setSeleccionado({ ...seleccionado, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    const prod = productos.find((p) => p.id === e.target.value);
    setSeleccionado(prod);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/productos/${seleccionado.id}`,
        seleccionado,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensaje({
        open: true,
        text: "Producto actualizado",
        severity: "success",
      });
      cargarProductos();
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al editar",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Elija un producto</InputLabel>
          <Select
            value={seleccionado?.id || ""}
            onChange={handleSelect}
            label="Producto"
          >
            {productos.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {seleccionado && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              fullWidth
              name="nombre"
              value={seleccionado.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              label="Tipo"
              fullWidth
              name="tipo"
              value={seleccionado.tipo}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              label="Descripción"
              fullWidth
              name="descripcion"
              value={seleccionado.descripcion}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Precio"
              type="number"
              fullWidth
              name="precio"
              value={seleccionado.precio}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              label="Stock"
              type="number"
              fullWidth
              name="stock_actual"
              value={seleccionado.stock_actual}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Guardar Cambios
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

export default EditarProducto;
