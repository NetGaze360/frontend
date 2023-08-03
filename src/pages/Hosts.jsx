import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Host from '../components/Host';

export const Hosts = () => {
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        // Aquí debes sustituir 'http://localhost:5000/hosts' por la URL de tu API
        fetch('http://germansncompany.duckdns.org:5000/hosts')
            .then(response => response.json())
            .then(data => setHosts(data))
            .catch(err => console.error(err));
    }, []); // El array vacío significa que este efecto se ejecutará sólo una vez, justo después de que el componente se monte

    return (
        <Container>
        <h1>Hosts</h1>
        {hosts.map(host => (
            <Host key={host._id} {...host} />
        ))}
        </Container>
    );
}
const Container = styled.div`
    heght:100vh;
    margin-left: 30px;
    overflow-y: auto;
`;