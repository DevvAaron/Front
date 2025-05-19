import { PieChart } from "@mui/x-charts/PieChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function MovimientosPorTipoChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/movimientos-tipo").then((res) => {
      const colores = {
        entrada: "#4caf50",
        salida: "#f44336",
      };

      const pieData = res.data.map((item, i) => ({
        id: i,
        value: item.cantidad,
        label: item.tipo,
        color: colores[item.tipo] || "#2196f3", // color por defecto si no es entrada/salida
      }));

      setData(pieData);
    });
  }, []);

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { additionalRadius: -5, color: "gray" },
        },
      ]}
      width={400}
      height={300}
    />
  );
}
