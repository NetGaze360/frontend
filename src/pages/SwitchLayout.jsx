import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Connection } from '../components/Connection';
import NewConnection from '../components/NewConnection';
import { Hosts } from '../pages/Hosts';
import Layout from '../components/Layout';
import FloatingLayout from '../components/FloatingLayout';
import { useEffect, useState } from 'react';
import { FiHardDrive, FiLoader } from 'react-icons/fi';

export function SwitchLayout({setPage}){
    const { id } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [switchInfo, setSwitchInfo] = useState({});
    const [evenConns, setEvenConns] = useState([]);
    const [oddConns, setOddConns] = useState([]);
    const [isNewConnectionOpen, setIsNewConnectionOpen] = useState(false);
    const [newConn, setNewConn] = useState({});

    useEffect(() => {
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
        fetch(import.meta.env.VITE_API_URI + '/conns/' + id)
            .then(response => response.json())
            .then(data => {
                setEvenConns(data.evenConns)
                setOddConns(data.oddConns)
                setDataLoaded(true)
            })
            .catch(err => console.error(err));
    };

    const createConn = (conn) => {
        fetch(import.meta.env.VITE_API_URI + '/conns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conn)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                getConns();
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
        >
            <Container>
                {dataLoaded ? (
                    <div className="switch-container">
                        <div className="ports-panel">
                            <div className="ports-row even-ports">
                                {evenConns && evenConns.map(conn => (
                                    <div 
                                        key={conn.swPort} 
                                        className="port-slot"
                                        onClick={() => openNewConnection(conn)}
                                    >
                                        <Connection connection={conn} isEven={true} />
                                    </div>
                                ))}
                            </div>
                            <div className="center-space" />
                            <div className="ports-row odd-ports">
                                {oddConns && oddConns.map(conn => (
                                    <div 
                                        key={conn.swPort}
                                        className="port-slot"
                                        onClick={() => openNewConnection(conn)}
                                    >
                                        <Connection connection={conn} isEven={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <LoadingState>
                        <FiLoader className="loading-icon" />
                        <span>Cargando switch...</span>
                    </LoadingState>
                )}
                {isNewConnectionOpen && (
                    <FloatingLayout
                        isOpen={isNewConnectionOpen}
                        onClose={closeNewConnection}
                        title='Add Connection'
                    >
                        {switchInfo.name} Port {newConn.swPort}
                        <Hosts 
                            mode='pick'
                            onHostSelect={(host) => {
                                setIsNewConnectionOpen(false)
                                newConn.switch = id
                                newConn.host = host._id
                                newConn.hostPort = 1
                                console.log(newConn)
                                createConn(newConn)
                            }}
                        />
                    </FloatingLayout>
                )}
            </Container>
        </Layout>
    );
}

const SwitchHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: ${props => props.theme.bg};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;

    .switch-icon {
        font-size: 1.75rem;
        color: ${props => props.theme.netgaze};
    }

    .info {
        h2 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: ${props => props.theme.text};
        }

        p {
            margin: 0.25rem 0 0;
            font-size: 0.875rem;
            color: ${props => props.theme.text}aa;
        }
    }
`;

const LoadingState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 1rem;
    color: ${props => props.theme.text}aa;

    .loading-icon {
        font-size: 2rem;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    span {
        font-size: 1.1rem;
    }
`;

const Container = styled.div`
    padding: 0 1.5rem 1.5rem;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;

    .switch-container {
        background: ${props => props.theme.bg};
        border-radius: 12px;
        padding: 2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .ports-panel {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        max-width: 1400px;
        margin: 0 auto;
    }

    .center-space {
        width: 2rem;
        flex-shrink: 0;
    }

    .ports-row {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        &.even-ports {
            padding-right: 0.25rem;
            .port-slot {
                display: flex;
                justify-content: flex-end;
            }
        }

        &.odd-ports {
            &.odd-ports {
            padding-left: 0.25rem;
            .port-slot {
                display: flex;
                justify-content: flex-start;
            }
        }
        }
    }

    .port-slot {
        width: 100%;
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 0.125rem;
        border-radius: 6px;

        &:hover {
            background: ${props => props.theme.netgaze}11;
        }
    }

    .content {
        margin-left: 0;
    }
`;

export default SwitchLayout;