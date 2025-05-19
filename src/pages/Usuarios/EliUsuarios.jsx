import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/axiosConfig";

const EliUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
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

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje({
        open: true,
        text: "Usuario eliminado correctamente",
        severity: "success",
      });
      cargarUsuarios();
    } catch (err) {
      setMensaje({
        open: true,
        text: err.response?.data?.mensaje || "Error al eliminar usuario",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <Container maxWidth="">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{textAlign: "center"}} >Nombre</TableCell>
              <TableCell style={{textAlign: "center"}} >DNI</TableCell>
              <TableCell style={{textAlign: "center"}} >Correo</TableCell>
              <TableCell style={{textAlign: "center"}} >Rol</TableCell>
              <TableCell style={{textAlign: "center"}} >Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {usuarios.map((u) => (
              <TableRow key={u.id}>
                <TableCell style={{textAlign: "center"}} >{u.nombre}</TableCell>
                <TableCell style={{textAlign: "center"}} >{u.dni}</TableCell>
                <TableCell style={{textAlign: "center"}} >{u.correo}</TableCell>
                <TableCell style={{textAlign: "center"}} >{u.rol}</TableCell>
                <TableCell style={{textAlign: "center"}} >
                  <IconButton
                    onClick={() => eliminarUsuario(u.id)}
                    color="error"
                  >
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

export default EliUsuario;
