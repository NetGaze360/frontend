import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Switch from '../components/Switch';
import { DndContext, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import NewHost2 from '../components/NewHost2';
import { CSS } from '@dnd-kit/utilities'
export const Switches = () => {
    const [switches, setSwitches] = useState([]);

    useEffect(() => {
        console.log(import.meta.env.VITE_API_URI);
        refresh();
    }, []); // El array vacío significa que este efecto se ejecutará sólo una vez, justo después de que el componente se monte

    const handleDragEnd = (event) => {
        const {over, active} = event;
        if (over && active.id !== over.id) {
            const overIndex = switches.findIndex(switchItem => switchItem._id === over.id);
            const activeIndex = switches.findIndex(switchItem => switchItem._id === active.id);
            const newSwitch = [...switches];
            newSwitch.splice(overIndex, 0, newSwitch.splice(activeIndex, 1)[0]);
            setSwitches(newSwitch);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openNewSwitch = () => {
        setIsModalOpen(true);
    };

    const closeNewSwitch = () => {
        setIsModalOpen(false);
    };

    const refresh = () => {
        fetch(import.meta.env.VITE_API_URI + '/switches')
            .then(response => response.json())
            .then(data => setSwitches(data))
            .catch(err => console.error(err));
    };

    return (
        <Container>
            {/* <DndContext 
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            > */}
{/*                 <SortableContext 
                    items={hosts.map(host => host._id)} 
                    strategy={verticalListSortingStrategy}
                    > */}
                    {switches.map(switchItem => (
                    <Switch key={switches._id} {...switches} refresh={refresh}/>
                    ))}
                {/* </SortableContext> */}
            {/* </DndContext> */}
            {isModalOpen && (
                <NewHost2 
                    className="nSwitch" 
                    isOpen={isModalOpen} 
                    onClose={closeNewSwitch} 
                    refresh={refresh}
                /> 
            )}

            <button className="addSwitchBt"
            onClick={openNewSwitch}>+</button>
        </Container>
    );
}
const Container = styled.div`

    .Host {
        margin-bottom: 10px;
    }
    .addSwitchBt {
        top: 92%;
        left: 95%;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        background-color: rgba(241, 241, 241, 0.3);;
        position: fixed;
        border: 1px solid black;
        border-radius: 100%;
        cursor: pointer;
        box-shadow: 10px 10px 15px rgba(0,0,0,0.4);
    }
    .addSwitchtBt:hover {
        background-color: rgba(47, 76, 204, 0.4);;
    }
`;
