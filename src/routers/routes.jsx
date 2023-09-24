import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Home} from "../pages/Home";
import {Hosts} from "../pages/Hosts";
import {Estadisticas} from "../pages/Estadisticas";
import { Switches } from "../pages/Switches";
import { SwitchLayout } from "../pages/SwitchLayout";

export function MyRoutes({setPage}) {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/hosts" element={<Hosts/>}/>
            <Route path="/switches" element={<Switches/>}/>
            <Route path="/switches/:id" element={<SwitchLayout setPage={setPage}/>}/>
        </Routes>
    );
}