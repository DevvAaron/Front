import React from 'react';
import { Typography, Paper } from '@mui/material';
import MovimientosPorTipoChart from '../components/MovimientosPorTipoChart';
import MovimientosPorFechaChart from '../components/MovimientosPorFechaChart';
import MovimientosPorObraChart from '../components/MovimientosPorObraChart';

const MovimientosPage = () => {
  return (
    <div style={{ padding: '2rem', height: '100vh', boxSizing: 'border-box' }}>
      <Typography variant="h5" gutterBottom>
        Gráficos de Movimientos
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '1.5rem',
          height: 'calc(100% - 56px)', // Resta la altura del título
        }}
      >
        {/* Fila 1 - Columna 1 */}
        <Paper style={{ padding: '1rem', width: '100%', height: '100%' }}>
          <Typography variant="subtitle1">Por Tipo</Typography>
          <MovimientosPorTipoChart />
        </Paper>

        {/* Fila 1 - Columna 2 */}
        <Paper style={{ padding: '1rem', width: '100%', height: '100%' }}>
          <Typography variant="subtitle1">Por Fecha</Typography>
          <MovimientosPorFechaChart />
        </Paper>

        {/* Fila 2 - Col-span 2 */}
        <Paper
          style={{
            gridColumn: '1 / span 2',
            padding: '1rem',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography variant="subtitle1">Por Obra</Typography>
          <MovimientosPorObraChart />
        </Paper>
      </div>
    </div>
  );
};

export default MovimientosPage;
