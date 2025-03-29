import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Hosts } from "../pages/Hosts";
import { Switches } from "../pages/Switches";
import { SwitchLayout } from "../pages/SwitchLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import SystemSettings from "../components/SystemSettings";
import PrivateRoute from "../components/PrivateRoute";
import { Sidebar } from "../components/Sidebar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export function MyRoutes({ setSidebarOpen, sidebarOpen, setPage }) {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    // Para las páginas de autenticación, no mostrar el sidebar
    if (isAuthPage) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} />
            </Routes>
        );
    }

    // Para las páginas protegidas, mostrar el sidebar
    return (
        <Container className={sidebarOpen ? "sidebarState active" : ""}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setPage={setPage} />
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/hosts" element={<Hosts />} />
                    <Route path="/switches" element={<Switches />} />
                    <Route path="/switches/:id" element={<SwitchLayout setPage={setPage} />} />
                    <Route path="/settings" element={<SystemSettings />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  background: ${({theme})=>theme.bgtotal};
  transition: all 0.3s;
  &.active{
    grid-template-columns: 300px auto;
  }
  color: ${({theme})=>theme.text};

  .content{
    margin-bottom: 500px;
    height: 100%;
    overflow-y: hidden;
    margin-left: 30px;
  }

  .header{
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${({theme})=>theme.bgtotal};
    color: ${(props)=>props.theme.text};
    margin-left: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px solid ${(props)=>props.theme.bg3};
  }
`;