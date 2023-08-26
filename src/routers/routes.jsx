import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Home} from "../pages/Home";
import {Hosts} from "../pages/Hosts";
import {Estadisticas} from "../pages/Estadisticas";
import { Switches } from "../pages/Switches";

export function MyRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/hosts" element={<Hosts/>}/>
            <Route path="/switches" element={<Switches/>}/>
        </Routes>
    );
}