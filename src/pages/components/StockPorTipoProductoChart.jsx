import { PieChart } from "@mui/x-charts/PieChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function StockPorTipoProductoChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/stock-por-tipo").then((res) => {
        setData(
          res.data.map((item, i) => ({
            id: i,
            value: Number(item.cantidad_total) || 0,
            label: item.tipo || "Sin tipo",
          }))
        );
      });
  }, []);

  return <PieChart series={[{ data }]} width={400} height={300} />;
}
