import { PieChart } from "@mui/x-charts/PieChart";
import axios from "../../api/axiosConfig";
import React, { useEffect, useState } from "react";

export default function ProductosUsadosPorTipoChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/dashboard/productos-usados-por-tipo").then((res) => {
        setData(
          res.data.map((item, i) => ({
            id: i,
            value: item.total_usado,
            label: item.tipo,
          }))
        );
      });
  }, []);

  return <PieChart series={[{ data }]} width={200} height={300} />;
}
