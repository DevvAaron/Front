import React, { useEffect, useState } from 'react';
import {
  Container, Paper, Typography, Table, TableHead, TableRow,
  TableCell, TableBody, IconButton, Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../api/axiosConfig';

const EliObra = () => {
  const [obras, setObras] = useState([]);
  const [mensaje, setMensaje] = useState({ open: false, text: '', severity: 'success' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const cargarObras = async () => {
    const res = await axios.get('/obras', { headers });
    setObras(res.data);
  };

  const eliminarObra = async (id) => {
    try {
      await axios.delete(`/obras/${id}`, { headers });
      setMensaje({ open: true, text: 'Obra eliminada', severity: 'success' });
      cargarObras();
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || 'Error al eliminar obra',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    cargarObras();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Eliminar Obras</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {obras.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.nombre}</TableCell>
                <TableCell>{o.estado}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => eliminarObra(o.id)} disabled={o.estado === 'finalizada'}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Snackbar open={mensaje.open} autoHideDuration={4000} onClose={() => setMensaje({ ...mensaje, open: false })}>
        <Alert severity={mensaje.severity}>{mensaje.text}</Alert>
      </Snackbar>
    </Container>
  );
};

export default EliObra;
