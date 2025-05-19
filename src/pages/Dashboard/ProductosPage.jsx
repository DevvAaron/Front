import React from 'react';
import { Typography, Paper } from '@mui/material';
import ProductosMasUsadosChart from '../components/ProductosMasUsadosChart';
import ProductosStockMinimoChart from '../components/ProductosStockMinimoChart';
import ProductosUsadosPorTipoChart from '../components/ProductosUsadosPorTipoChart';
import ValorTotalPorProductoChart from '../components/ValorTotalPorProductoChart';

const MovimientosPage = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', boxSizing: 'border-box' }}>
      <Typography variant="h5" gutterBottom>
        Gráficos de Productos
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '1.5rem',
        }}
      >
        {/* Primera fila - 3 columnas */}
        <Paper style={{ padding: '1rem', width: '100%', height: '100%' }}>
          <Typography variant="subtitle1">Más usados</Typography>
          <ProductosMasUsadosChart />
        </Paper>

        <Paper style={{ padding: '1rem', width: '100%', height: '100%' }}>
          <Typography variant="subtitle1">Productos con stock mínimo</Typography>
          <ProductosStockMinimoChart />
        </Paper>

        <Paper style={{ padding: '1rem', width: '100%', height: '100%' }}>
          <Typography variant="subtitle1">Por tipo</Typography>
          <ProductosUsadosPorTipoChart />
        </Paper>

        {/* Segunda fila - que abarca las 3 columnas */}
        <Paper
          style={{
            gridColumn: '1 / 4',
            padding: '1rem',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography variant="subtitle1">Valor Total</Typography>
          <ValorTotalPorProductoChart />
        </Paper>
      </div>
    </div>
  );
};

export default MovimientosPage;
