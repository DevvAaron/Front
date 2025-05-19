import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import axios from "../../api/axiosConfig";

const EdiObra = () => {
  const [obras, setObras] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [obra, setObra] = useState(null);
  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "success",
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const cargarDatos = async () => {
      const [resObras, resEmpleados] = await Promise.all([
        axios.get("/obras", { headers }),
        axios.get("/usuarios?rol=empleado", {
          headers,
        }),
      ]);
      setObras(resObras.data);
      setEmpleados(resEmpleados.data);
    };

    cargarDatos();
  }, []);

  const handleSelectObra = (e) => {
    const selected = obras.find((o) => o.id === e.target.value);
    setObra({
      ...selected,
      empleados: selected.empleados?.map((e) => e.id) || [],
    });
  };

  const handleChange = (e) => {
    setObra({ ...obra, [e.target.name]: e.target.value });
  };

  const handleSelectEmpleados = (e) => {
    const {
      target: { value },
    } = e;
    setObra((prev) => ({
      ...prev,
      empleados: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/obras/${obra.id}`, obra, {
        headers,
      });
      setMensaje({
        open: true,
        text: "Obra actualizada correctamente",
        severity: "success",
      });
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al actualizar la obra",
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Editar Obra
        </Typography>

        {/* Selección de obra */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Selecciona una obra</InputLabel>
          <Select
            value={obra?.id || ""}
            onChange={handleSelectObra}
            label="Obra"
          >
            {obras.map((o) => (
              <MenuItem key={o.id} value={o.id}>
                {o.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Formulario de edición */}
        {obra && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={obra.nombre}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Fecha inicio"
              type="date"
              name="fecha_inicio"
              value={obra.fecha_inicio?.slice(0, 10)}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Fecha fin"
              type="date"
              name="fecha_fin"
              value={obra.fecha_fin?.slice(0, 10)}
              onChange={handleChange}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Estado</InputLabel>
              <Select
                name="estado"
                value={obra.estado}
                onChange={handleChange}
                label="Estado"
              >
                <MenuItem value="en curso">En curso</MenuItem>
                <MenuItem value="finalizada">Finalizada</MenuItem>
                <MenuItem value="próximamente">Próximamente</MenuItem>
              </Select>
            </FormControl>

            {/* Empleados asignados */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Empleados asignados</InputLabel>
              <Select
                multiple
                name="empleados"
                value={obra.empleados}
                onChange={handleSelectEmpleados}
                input={<OutlinedInput label="Empleados asignados" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => empleados.find((u) => u.id === id)?.nombre)
                    .join(", ")
                }
              >
                {empleados.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    <Checkbox checked={obra.empleados.includes(u.id)} />
                    <ListItemText primary={u.nombre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

export default EdiObra;
