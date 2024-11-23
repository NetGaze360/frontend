import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Connection} from '../components/Connection';
import NewConnection from '../components/NewConnection';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

export function SwitchLayout({setPage}){
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [switchInfo, setSwitchInfo] = useState({});
    const [evenConns, setEvenConns] = useState([]);
    const [oddConns, setOddConns] = useState([]);
    const [isNewConnectionOpen, setIsNewConnectionOpen] = useState(false);
    const [newConn, setNewConn] = useState({});

    useEffect(() => {
        //getSwitchInfo();
        getConns();
        getSwitchInfo();
    }, [id]);

    useEffect(() => {
        if (switchInfo.name) {
            setPage(switchInfo.name);
        }
    }, [switchInfo.name, setPage]);

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

    const openNewConnection = (conn) => {
        setIsNewConnectionOpen(true);
        setNewConn(conn);
    }

    const closeNewConnection = () => {
        setIsNewConnectionOpen(false);
    }

    return (
        <Layout
            page={switchInfo.name}
            headerContent={null}
        >
            <Container>
                {dataLoaded ? (
                    <>
                    {/* Muestra las conexiones */}
                    <div className="conns">
                        <div className="connections-even">
                            {evenConns && evenConns.map(evenConn => (
                                <div key={evenConn.swPort} onClick={() => openNewConnection(evenConn)}>
                                    <Connection connection={evenConn} />
                                </div>
                            ))}
                        </div>
                        <div className="connections-odd">
                            {oddConns && oddConns.map(oddConn => (
                                <div key={oddConn.swPort} onClick={() => openNewConnection(oddConn)}>
                                    <Connection connection={oddConn} />
                                </div>
                            ))}
                        </div>
                    </div>
                    </>
                ) : (
                    <h1>Cargando...</h1>
                )}
                {isNewConnectionOpen && (
                    <NewConnection
                        isOpen={isNewConnectionOpen}
                        onClose={closeNewConnection}
                        refresh={getConns}
                        conn={newConn}
                    />
                )}
            </Container>
        </Layout>
    );
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
    }  
    `;