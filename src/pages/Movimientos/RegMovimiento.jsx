import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Snackbar,
  Alert,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "../../api/axiosConfig";

const RegMovimiento = () => {
  const [form, setForm] = useState({
    tipo: "salida",
    motivo: "instalación",
    cantidad: "",
    observacion: "",
    id_producto: "",
    id_usuario: "",
    id_obra: "",
  });

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [obras, setObras] = useState([]);
  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${token}` };
      const [p, u, o] = await Promise.all([
        axios.get("/productos", { headers }),
        axios.get("/usuarios?rol=empleado", {
          headers,
        }),
        axios.get("/obras", { headers }),
      ]);
      setProductos(p.data);
      setUsuarios(u.data);
      setObras(o.data.filter((ob) => ob.estado !== "finalizada"));
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/movimientos/registrar",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMensaje({
        open: true,
        text: "Movimiento registrado",
        severity: "success",
      });
      setForm({
        tipo: "salida",
        motivo: "instalación",
        cantidad: "",
        observacion: "",
        id_producto: "",
        id_usuario: "",
        id_obra: "",
      });
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al registrar",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Registrar Movimiento
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select name="tipo" value={form.tipo} onChange={handleChange}>
              <MenuItem value="entrada">Entrada</MenuItem>
              <MenuItem value="salida">Salida</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Motivo</InputLabel>
            <Select name="motivo" value={form.motivo} onChange={handleChange}>
              <MenuItem value="instalación">Instalación</MenuItem>
              <MenuItem value="reemplazo">Reemplazo</MenuItem>
              <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Cantidad"
            name="cantidad"
            type="number"
            value={form.cantidad}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Observación"
            name="observacion"
            value={form.observacion}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Producto</InputLabel>
            <Select
              name="id_producto"
              value={form.id_producto}
              onChange={handleChange}
              required
            >
              {productos.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Empleado</InputLabel>
            <Select
              name="id_usuario"
              value={form.id_usuario}
              onChange={handleChange}
              required
            >
              {usuarios.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  {u.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Obra</InputLabel>
            <Select
              name="id_obra"
              value={form.id_obra}
              onChange={handleChange}
              required
            >
              {obras.map((o) => (
                <MenuItem key={o.id} value={o.id}>
                  {o.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default RegMovimiento;
