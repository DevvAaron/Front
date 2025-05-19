import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import axios from "../../api/axiosConfig";

export default function EmpleadosPorObraChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/empleados-por-obra").then((res) => setData(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Cantidad de empleados por obra
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Obra</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Empleados asignados
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((obra, i) => (
              <TableRow key={i}>
                <TableCell>{obra.obra}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {obra.empleados_activos}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
