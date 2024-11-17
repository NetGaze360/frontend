import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Switch from '../components/Switch';
import { DndContext, closestCenter} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import NewSwitch from '../components/NewSwitch';
import Layout from '../components/Layout';
import { CSS } from '@dnd-kit/utilities'
import { Link } from 'react-router-dom';

export const Switches = () => {
    const [switches, setSwitches] = useState([]);

    useEffect(() => {
        console.log(import.meta.env.VITE_API_URI);
        refresh();
        switches.forEach((switchItem, index) => {
            console.log(switchItem.nports);
        });
    }, []); // El array vacío significa que este efecto se ejecutará sólo una vez, justo después de que el componente se monte

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
        <Layout
            page="Switches"
        >
            <Container>
                {switches.map(switchItem => (
                    <Link to={`/switches/${switchItem._id}`} key={switchItem._id} >
                        <Switch key={switchItem._id} {...switchItem} refresh={refresh}/>
                    </Link>
                ))}
                {isModalOpen && (
                    <NewSwitch
                        className="nSwitch" 
                        isOpen={isModalOpen} 
                        onClose={closeNewSwitch} 
                        refresh={refresh}
                    /> 
                )}
                <button className="addSwitchBt"
                onClick={openNewSwitch}>+</button>
            </Container>
        </Layout>
    );
}
const Container = styled.div`

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

    a {
        text-decoration: none; /* Elimina la decoración de texto predeterminada */
        color: inherit; /* Utiliza el color de texto heredado */
      }
`;
