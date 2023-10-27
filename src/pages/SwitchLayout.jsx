import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Connection} from '../components/Connection';
import { useEffect, useState } from 'react';

export function SwitchLayout({setPage}){
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [switchInfo, setSwitchInfo] = useState({});
    const [evenConns, setEvenConns] = useState([]);
    const [oddConns, setOddConns] = useState([]);

    useEffect(() => {
        //getSwitchInfo();
        getConns();
        getSwitchInfo();
    }, []); // El array vacío significa que este efecto se ejecutará sólo una vez, justo después de que el componente se monte

    const getSwitchInfo = () => {
        fetch(import.meta.env.VITE_API_URI + '/switches/' + id)
            .then(response => response.json())
            .then(data => {
                setSwitchInfo(data)

            })
            .catch(err => console.error(err));
    };

    const getConns = () => {
        console.log(import.meta.env.VITE_API_URI + '/conns/' + id);
        fetch(import.meta.env.VITE_API_URI + '/conns/' + id)
            .then(response => response.json())
            .then(data => {
                setEvenConns(data.evenConns)
                setOddConns(data.oddConns)
                setDataLoaded(true)
            })
            .catch(err => console.error(err));
    };

    return (
        <Container>
            {dataLoaded ? (
                <>
                {/* Muestra las conexiones */}
                { setPage(switchInfo.name)}
                <div className="conns">
                    <div className="connections-even">
                        {evenConns && evenConns.map(evenConn => (
                            <div key={evenConn.swPort}>
                                <Connection connection={evenConn} />
                            </div>
                        ))}
                    </div>
                    <div className="connections-odd">
                        {oddConns && oddConns.map(oddConn => (
                            <div key={oddConn.swPort}>
                                <Connection connection={oddConn} />
                            </div>
                        ))}
                    </div>
                </div>
                </>
            ) : (
                <h1>Cargando...</h1>
            )}
        </Container>);
}
const Container = styled.div`
    display: flex;
    margin-right: 25px;
    margin-bottom: 40px;
    .conns {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .connections-even {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 50%;
    }

    .connections-odd {
        display: flex;
        flex-direction: column;
        justify-content: space-between;  
        height: 100%;
        width: 50%;
    `;