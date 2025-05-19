import { LineChart } from "@mui/x-charts/LineChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function MovimientosPorFechaChart() {
  const [fechas, setFechas] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/movimientos-fecha").then((res) => {
      const datos = res.data;

      const entradasPorMes = {};
      const salidasPorMes = {};

      datos.forEach((d) => {
        if (!d.fecha || !d.tipo) return;

        const fecha = new Date(d.fecha);
        const clave = fecha.toISOString().slice(0, 7); // "2025-05"
        const cantidad = Number(d.cantidad) || 0;

        if (d.tipo === "entrada") {
          entradasPorMes[clave] = (entradasPorMes[clave] || 0) + cantidad;
        } else if (d.tipo === "salida") {
          salidasPorMes[clave] = (salidasPorMes[clave] || 0) + cantidad;
        }
      });

      const claves = Array.from(
        new Set([...Object.keys(entradasPorMes), ...Object.keys(salidasPorMes)])
      ).sort();

      const etiquetasLegibles = claves.map((clave) => {
        const [anio, mes] = clave.split("-");
        const fecha = new Date(anio, mes - 1);
        return new Intl.DateTimeFormat("es-PE", {
          month: "long",
          year: "numeric",
        }).format(fecha);
      });

      const datosEntradas = claves.map((k) => entradasPorMes[k] ?? 0);
      const datosSalidas = claves.map((k) => salidasPorMes[k] ?? 0);

      setFechas(etiquetasLegibles);
      setEntradas(datosEntradas);
      setSalidas(datosSalidas);
    });
  }, []);

  if (!fechas.length) return <p>No hay datos disponibles.</p>;

  return (
    <LineChart
      xAxis={[{ data: fechas, scaleType: "band", label: "Mes" }]}
      series={[
        { data: entradas, label: "Entradas", color: "#4caf50" },
        { data: salidas, label: "Salidas", color: "#f44336" },
      ]}
      width={700}
      height={350}
    />
  );
}
