import { BarChart } from "@mui/x-charts/BarChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function ValorTotalPorProductoChart() {
  const [labels, setLabels] = useState([]);
  const [valores, setValores] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/valor-stock-producto").then((res) => {
        const nombres = res.data.map((p) => p.nombre || "Sin nombre");
        const valoresNumericos = res.data.map(
          (p) => Number(p.valor_total) || 0
        );

        setLabels(nombres);
        setValores(valoresNumericos);
      });
  }, []);

  if (!valores.length) return <p>No hay datos para mostrar.</p>;

  return (
    <BarChart
      yAxis={[{ data: labels, scaleType: "band" }]}
      series={[
        {
          data: valores,
          label: "Valor S/.",
          color: "#1976d2",
        },
      ]}
      layout="horizontal"
      width={600}
      height={labels.length * 40}
    />
  );
}
