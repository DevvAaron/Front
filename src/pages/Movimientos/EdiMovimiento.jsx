import React, { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, Select, MenuItem, TextField,
  Button, Box, Snackbar, Alert, InputLabel, FormControl
} from '@mui/material';
import axios from '../../api/axiosConfig';

const EdiMovimiento = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [movimientos, setMovimientos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState({ open: false, text: '', severity: 'success' });
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/usuarios?rol=empleado', { headers })
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  const cargarMovimientos = async () => {
    if (!usuarioId) return;

    try {
      const params = { id_usuario: usuarioId };
      if (desde) params.desde = desde;
      if (hasta) params.hasta = hasta;

      const res = await axios.get('/movimientos', { headers, params });
      setMovimientos(res.data);
      setSeleccionado(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUsuarioChange = (e) => {
    const id = e.target.value;
    setUsuarioId(id);
    setMovimientos([]);
    setSeleccionado(null);
  };

  const handleSelectMovimiento = (e) => {
    const mov = movimientos.find((m) => m.id === e.target.value);
    setSeleccionado({ ...mov });
  };

  const handleChange = (e) => {
    setSeleccionado({ ...seleccionado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/movimientos/${seleccionado.id}`, seleccionado, { headers });
      setMensaje({ open: true, text: 'Movimiento actualizado correctamente', severity: 'success' });
      cargarMovimientos();
    } catch (err) {
      setMensaje({ open: true, text: err.response?.data?.mensaje || 'Error al actualizar', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Editar Movimiento por Empleado</Typography>

        {/* Empleado */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Empleado</InputLabel>
          <Select value={usuarioId} onChange={handleUsuarioChange}>
            {usuarios.map((u) => (
              <MenuItem key={u.id} value={u.id}>{u.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Fecha desde y hasta */}
        <TextField
          label="Desde"
          type="date"
          fullWidth
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Hasta"
          type="date"
          fullWidth
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={cargarMovimientos}
          disabled={!usuarioId}
        >
          Buscar Movimientos
        </Button>

        {/* Selección de movimiento */}
        {movimientos.length > 0 && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Movimiento</InputLabel>
            <Select value={seleccionado?.id || ''} onChange={handleSelectMovimiento}>
              {movimientos.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {`${m.tipo} - ${m.producto} (${m.cantidad})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Formulario de edición */}
        {seleccionado && (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Motivo"
              name="motivo"
              value={seleccionado.motivo}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Cantidad"
              name="cantidad"
              type="number"
              value={seleccionado.cantidad}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Observación"
              name="observacion"
              value={seleccionado.observacion}
              onChange={handleChange}
              margin="normal"
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

export default EdiMovimiento;
