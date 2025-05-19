import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import TopEmpleadosPorMovimientosChart from "../components/TopEmpleadosPorMovimientosChart";
import EmpleadosPorObraChart from "../components/EmpleadosPorObraChart";

const MovimientosPage = () => (
  <Container maxWidth="xl" sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom>
      Gráficos de Empleados
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Por Movimientos</Typography>
          <TopEmpleadosPorMovimientosChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <EmpleadosPorObraChart />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default MovimientosPage;
