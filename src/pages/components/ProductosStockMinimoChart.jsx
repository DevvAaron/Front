import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Box,
} from "@mui/material";
import axios from "../../api/axiosConfig";

const semaforoColor = (stock) => {
  if (stock <= 1) return "red";
  if (stock <= 3) return "orange";
  return "green";
};

export default function ProductosStockMinimoChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/productos-stock-minimo").then((res) => setData(res.data));
  }, []);

  return (
    <Container>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Producto</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Stock Actual
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Alerta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((prod, i) => (
              <TableRow key={i}>
                <TableCell>{prod.nombre}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {prod.stock_actual}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Box
                    width={15}
                    height={15}
                    borderRadius="50%"
                    bgcolor={semaforoColor(prod.stock_actual)}
                    display="inline-block"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
