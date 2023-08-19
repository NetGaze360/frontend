import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Host from '../components/Host';
import { DndContext, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import NewHost2 from '../components/NewHost2';
import { CSS } from '@dnd-kit/utilities'

export const Hosts = () => {
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        console.log(import.meta.env.VITE_API_URI);
        fetch(import.meta.env.VITE_API_URI + '/hosts')
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openNewHost = () => {
        setIsModalOpen(true);
    };

    const closeNewHost = () => {
        setIsModalOpen(false);
    };

    const refresh = () => {
        fetch(import.meta.env.VITE_API_URI + '/hosts')
            .then(response => response.json())
            .then(data => setHosts(data))
            .catch(err => console.error(err));
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
                    ))}
                </SortableContext>
            </DndContext>
            <NewHost2 
                className="nHost" 
                isOpen={isModalOpen} 
                onClose={closeNewHost} 
                refresh={refresh}
            /> 
            <button className="addHostBt"
            onClick={openNewHost}>+</button>
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
    .addHostBt {
        top: 90%;
        left: 93%;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        background-color: #f1f1f1;
        position: fixed;
        border: 1px solid black;
        border-radius: 100%;
        cursor: pointer;
    }
`;