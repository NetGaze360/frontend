import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Host from '../components/Host';
import { DndContext, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export const Hosts = () => {
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        // Aquí debes sustituir 'http://localhost:5000/hosts' por la URL de tu API
        console.log(import.meta.env.VITE_API_URL + '/hosts');
        fetch(import.meta.env.VITE_API_URL + '/hosts')
            .then(response => response.json())
            .then(data => setHosts(data))
            .catch(err => console.error(err));
    }, []); // El array vacío significa que este efecto se ejecutará sólo una vez, justo después de que el componente se monte

    const handleDragEnd = (event) => {
        const {over, active} = event;
        if (over && active.id !== over.id) {
            const overIndex = hosts.findIndex(host => host._id === over.id);
            const activeIndex = hosts.findIndex(host => host._id === active.id);
            const newHosts = [...hosts];
            newHosts.splice(overIndex, 0, newHosts.splice(activeIndex, 1)[0]);
            setHosts(newHosts);
        }
    };

    return (
        <Container>
            <h1>Hosts</h1>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={hosts.map(host => host._id)} 
                    strategy={verticalListSortingStrategy}
                    >
                    {hosts.map(host => (
                    <Host key={host._id} {...host} />
                    )
                    )
                    }
                </SortableContext>
                

            </DndContext>
        </Container>
    );
}
const Container = styled.div`
    heght:100vh;
    margin-left: 30px;
    overflow-y: auto;
    .Host {
        margin-bottom: 10px;

        
    }
`;