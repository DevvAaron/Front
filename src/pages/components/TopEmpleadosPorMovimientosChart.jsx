import { BarChart } from "@mui/x-charts/BarChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function TopEmpleadosPorMovimientosChart() {
  const [labels, setLabels] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/top-empleados-movimientos").then((res) => {
        setLabels(res.data.map((e) => e.nombre));
        setEntradas(res.data.map((e) => Number(e.entradas) || 0));
        setSalidas(res.data.map((e) => Number(e.salidas) || 0));
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
      height={300}
    />
  );
}
