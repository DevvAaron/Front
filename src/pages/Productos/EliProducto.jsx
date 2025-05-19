import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../api/axiosConfig';

const EliminarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState({ open: false, text: '', severity: 'success' });

  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/productos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje({ open: true, text: 'Producto eliminado', severity: 'success' });
      cargarProductos();
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || 'Error al eliminar',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NOMBRE</TableCell>
              <TableCell>TIPO</TableCell>
              <TableCell>STOCK</TableCell>
              <TableCell>ACCIÓN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nombre}</TableCell>
                <TableCell>{p.tipo}</TableCell>
                <TableCell>{p.stock_actual}</TableCell>
                <TableCell>
                  <IconButton onClick={() => eliminarProducto(p.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

export default EliminarProducto;
