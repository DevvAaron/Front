import { BarChart } from "@mui/x-charts/BarChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function ProductosMasUsadosChart() {
  const [labels, setLabels] = useState([]);
  const [cantidades, setCantidades] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/productos-usados").then((res) => {
        setLabels(res.data.map((p) => p.nombre));
        setCantidades(res.data.map((p) => p.total_usado));
      });
  }, []);

  return (
    <BarChart
      xAxis={[{ data: labels, scaleType: "band" }]}
      series={[{ data: cantidades }]}
      width={500}
      height={300}
    />
  );
}
