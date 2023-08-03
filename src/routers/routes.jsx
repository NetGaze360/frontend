import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Home} from "../pages/Home";
import {Hosts} from "../pages/Hosts";
import {Estadisticas} from "../pages/Estadisticas";

export function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/hosts" element={<Hosts/>}/>
            <Route path="/estadisticas" element={<Estadisticas/>}/>
        </Routes>
    );
}