import { BarChart } from "@mui/x-charts/BarChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function MovimientosPorObraChart() {
  const [labels, setLabels] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/movimientos-por-obra")
      .then((res) => {
        const nombres = res.data.map((o) => o.obra || "Sin nombre");
        const entra = res.data.map((o) => Number(o.entradas) || 0);
        const sald = res.data.map((o) => Number(o.salidas) || 0);
        setLabels(nombres);
        setEntradas(entra);
        setSalidas(sald);
      });
  }, []);

  return (
    <BarChart
      xAxis={[{ data: labels, scaleType: "band" }]}
      series={[
        { data: entradas, label: "Entradas", color: "#4caf50" },
        { data: salidas, label: "Salidas", color: "#f44336" },
      ]}
      width={600}
      height={labels.length * 150}
    />
  );
}
