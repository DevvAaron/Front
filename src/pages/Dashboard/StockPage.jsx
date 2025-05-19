import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import StockPorTipoProductoChart from '../components/StockPorTipoProductoChart';

const MovimientosPage = () => (
  <Container maxWidth="xl" sx={{ mt: 4 }}>
    <Typography variant="h5" gutterBottom>Gráficos del Stock</Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Por tipo de producto</Typography>
          <StockPorTipoProductoChart />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

export default MovimientosPage;
