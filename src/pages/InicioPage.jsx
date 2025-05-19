import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

//ELEMENTOS
import logo from "../assets/Logo.png";
//ICONOS
import InventoryIcon from "@mui/icons-material/Inventory";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import HandymanIcon from "@mui/icons-material/Handyman";
import DescriptionIcon from "@mui/icons-material/Description";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";

//PAGINAS
// Inicio
import Inicio from "./Inicio/Inicio";
import UsuariosInicio from "./Inicio/UsuariosInicio";
import ProductosInicio from './Inicio/ProductosInicio';
import MovimientosInicio from './Inicio/MovimientosInicio';
import ObrasInicio from "./Inicio/ObrasInicio";
import ReportesInicio from "./Inicio/ReportesInicio";
// Productos
import RegProducto from "./Productos/RegProducto";
import EliProducto from "./Productos/EliProducto";
import EditProducto from "./Productos/EdiProducto";
// Usuarios
import RegUsuario from "./Usuarios/RegUsuarios";
import EliUsuario from "./Usuarios/EliUsuarios";
import EditUsuario from "./Usuarios/EdiUsuarios";
// Movimientos
import RegMovimiento from "./Movimientos/RegMovimiento";
import EditMovimiento from "./Movimientos/EdiMovimiento";
// Obras
import RegObras from "./Obras/RegObras";
import EditObras from "./Obras/EdiObras";
import EliObras from "./Obras/EliObras";
// Dashboard
import MovimientosPage from "./Dashboard/MovimientosPage";
import ProductosPage from "./Dashboard/ProductosPage";
import EmpleadosPage from "./Dashboard/EmpleadosPage";
import StockPage from "./Dashboard/StockPage";

const tema = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: "cursive",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

export default function DashboardLayoutBasic() {
  const { usuario } = useContext(AuthContext);
  const rolUsuario = usuario?.rol || "empleado";
  const { logout } = useContext(AuthContext);

  const NAVIGATION =
    rolUsuario === "administrador"
      ? [
          {
            kind: "header",
            title: "Registros",
          },
          {
            segment: "usuarios",
            title: "Usuarios",
            icon: <FolderSharedIcon />,
            children: [
              {
                segment: "regUsuario",
                title: "Registro",
                icon: <PersonAddIcon />,
              },
              {
                segment: "edtUsuario",
                title: "Editar",
                icon: <EditIcon />,
              },
              {
                segment: "elimUsuario",
                title: "Eliminar",
                icon: <DeleteIcon />,
              },
            ],
          },
          {
            segment: "productos",
            title: "Productos",
            icon: <InventoryIcon />,
            children: [
              {
                segment: "regProducto",
                title: "Registro",
                icon: <AddIcon />,
              },
              {
                segment: "edtProducto",
                title: "Editar",
                icon: <EditIcon />,
              },
              {
                segment: "elimProducto",
                title: "Eliminar",
                icon: <DeleteIcon />,
              },
            ],
          },
          {
            segment: "movimientos",
            title: "Movimientos",
            icon: <DriveFileMoveIcon />,
            children: [
              {
                segment: "regMovimiento",
                title: "Registro",
                icon: <AddIcon />,
              },
              {
                segment: "edtMovimiento",
                title: "Editar",
                icon: <EditIcon />,
              },
            ],
          },
          {
            segment: "obra",
            title: "Obra",
            icon: <HandymanIcon />,
            children: [
              {
                segment: "regObras",
                title: "Registro",
                icon: <AddIcon />,
              },
              {
                segment: "edtObras",
                title: "Editar",
                icon: <EditIcon />,
              },
              {
                segment: "elimObras",
                title: "Eliminar",
                icon: <DeleteIcon />,
              },
            ],
          },
          {
            kind: "divider",
          },
          {
            kind: "header",
            title: "Analisis",
          },
          {
            segment: "reportes",
            title: "Reportes",
            icon: <AnalyticsIcon />,
            children: [
              {
                segment: "movimientos",
                title: "Analisis de movimientos",
                icon: <DescriptionIcon />,
              },
              {
                segment: "productos",
                title: "Analisis de productos",
                icon: <DescriptionIcon />,
              },
              {
                segment: "empleados",
                title: "Analisis de empleados",
                icon: <DescriptionIcon />,
              },
              {
                segment: "stock",
                title: "Analisis del stock",
                icon: <DescriptionIcon />,
              },
            ],
          },
          {
            segment: "logout",
            title: "Cerrar sesión",
            icon: <LogoutIcon />,
            onClick: logout, // esto lo manejaremos manualmente
          },
        ]
      : [
          {
            kind: "header",
            title: "Registros",
          },
          {
            segment: "productos",
            title: "Productos",
            icon: <InventoryIcon />,
            children: [
              {
                segment: "regProducto",
                title: "Registro",
                icon: <AddIcon />,
              },
            ],
          },
          {
            segment: "movimientos",
            title: "Movimientos",
            icon: <DriveFileMoveIcon />,
            children: [
              {
                segment: "regMovimiento",
                title: "Registro",
                icon: <AddIcon />,
              },
            ],
          },
          {
            segment: "logout",
            title: "Cerrar sesión",
            icon: <LogoutIcon />,
            onClick: logout, // esto lo manejaremos manualmente
          },
        ];

  const router = useDemoRouter("/inicio");
  const routeComponents = {
    "/logout": <div>Redirigiendo...</div>,
    "/inicio": <Inicio />,
    "/usuarios": <UsuariosInicio />,
    "/productos": <ProductosInicio />,
    "/movimientos": <MovimientosInicio />,
    "/obra": <ObrasInicio />,
    "/reportes": <ReportesInicio />,
    "/productos/regProducto": <RegProducto />,
    "/productos/elimProducto": <EliProducto />,
    "/productos/edtProducto": <EditProducto />,
    "/usuarios/inicio": <RegProducto />,
    "/usuarios/regUsuario": <RegUsuario />,
    "/usuarios/elimUsuario": <EliUsuario />,
    "/usuarios/edtUsuario": <EditUsuario />,
    "/movimientos/inicio": <RegProducto />,
    "/movimientos/regMovimiento": <RegMovimiento />,
    "/movimientos/edtMovimiento": <EditMovimiento />,
    "/obra/inicio": <RegProducto />,
    "/obra/regObras": <RegObras />,
    "/obra/edtObras": <EditObras />,
    "/obra/elimObras": <EliObras />,
    "/reportes/inicio": <RegProducto />,
    "/reportes/movimientos": <MovimientosPage />,
    "/reportes/productos": <ProductosPage />,
    "/reportes/empleados": <EmpleadosPage />,
    "/reportes/stock": <StockPage />,
  };
  React.useEffect(() => {
    if (router.pathname === "/logout") {
      logout();
    }
  }, [router.pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <img src={logo} alt="Logo" />,
        colorSchemeSelector: "primary",
        title: "",
        homeUrl: "/inicio",
      }}
      theme={tema}
    >
      <DashboardLayout>
        <PageContainer allowFullScreen>
          {routeComponents[router.pathname] || <div>Página no encontrada</div>}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
