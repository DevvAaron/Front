import React from "react";
import LoginPage from "./pages/LoginPage";
import InicioPage from "./pages/InicioPage";
import PrivateRoute from "./routes/PrivateRoute";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return ( 
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/inicio"
        element={
          <PrivateRoute>
            <InicioPage />
          </PrivateRoute>
        }
      />

      {/* Redirige cualquier ruta desconocida al login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
