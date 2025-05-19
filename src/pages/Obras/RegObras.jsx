import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import axios from "../../api/axiosConfig";

const RegObra = () => {
  const [form, setForm] = useState({
    nombre: "",
    estado: "en curso",
    fecha_inicio: "",
    fecha_fin: "",
    empleados: [],
  });

  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const cargarEmpleados = async () => {
      try {
        const res = await axios.get(
          "/usuarios?rol=empleado",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsuarios(res.data);
      } catch (err) {
        console.error("Error al cargar empleados", err);
      }
    };

    cargarEmpleados();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectEmpleados = (e) => {
    const {
      target: { value },
    } = e;
    setForm((prev) => ({
      ...prev,
      empleados: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.empleados.length === 0) {
      setMensaje({
        open: true,
        text: "Debes asignar al menos un empleado",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post("/obras/registrar", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje({
        open: true,
        text: "Obra registrada correctamente",
        severity: "success",
      });
      setForm({
        nombre: "",
        estado: "en curso",
        fecha_inicio: "",
        fecha_fin: "",
        empleados: [],
      });
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al registrar obra",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6">Registrar Obra</Typography>
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
            label="Fecha de inicio"
            name="fecha_inicio"
            type="date"
            value={form.fecha_inicio}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Fecha de fin"
            name="fecha_fin"
            type="date"
            value={form.fecha_fin}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Empleados asignados</InputLabel>
            <Select
              multiple
              name="empleados"
              value={form.empleados}
              onChange={handleSelectEmpleados}
              input={<OutlinedInput label="Empleados asignados" />}
              renderValue={(selected) =>
                selected
                  .map((id) => usuarios.find((u) => u.id === id)?.nombre)
                  .join(", ")
              }
            >
              {usuarios.map((u) => (
                <MenuItem key={u.id} value={u.id}>
                  <Checkbox checked={form.empleados.includes(u.id)} />
                  <ListItemText primary={u.nombre} />
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

export default RegObra;
