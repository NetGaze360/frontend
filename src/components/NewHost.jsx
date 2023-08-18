import React, { useState } from 'react';
import {useDraggable, useDroppable} from '@dnd-kit/core';
import Modal from 'react-modal';
import styled from 'styled-components';
import { CSS } from '@dnd-kit/utilities'

Modal.setAppElement('#root'); // Especifica el elemento raíz para manejar la accesibilidad

function NewHost ({ isOpen, onClose })  {

  if (!isOpen) return null;
    
  const [position, setPosition] = useState({ x: 200, y: 200 }); // Estado para la posición

  const { attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: 'newHostWindow',
  });

  console.log('Transform:', transform);
  console.log('isDragging:', isDragging);

  console.log(position);

  const style = {

    transform: CSS.Transform.toString(transform),
    position: 'absolute',
  };

  return (
    <Container 
            ref={setNodeRef} 
            style={style}
            {...listeners}
            {...attributes}
        >
        <button className="modal-close-button" onClick={onClose}>
            X
        </button>
        <header>Add Host</header>
        <div className="content">
            <form>
                <div className="form-group">
                    <label htmlFor="hostname">Hostname</label>
                    <input type="text" id="name" placeholder="Name" />

                    <label htmlFor="ip">IP</label>
                    <input type="text" id="ip" placeholder="IP" />

                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" placeholder="Description" />

                    <label htmlFor="brand">Brand</label>
                    <input type="text" id="brand" placeholder="Brand" />

                    <label htmlFor="model">Model</label>
                    <input type="text" id="model" placeholder="Model" />

                    <label htmlFor="serial">Serial</label>
                    <input type="text" id="serial" placeholder="Serial" />
                    
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" placeholder="Location" />

                    </div>
            </form>
        </div>
    </Container>


  );
};

export default NewHost;

const Container = styled.div`
    position: absolute;
    width: 60%;
    height: 60%;
    background-color: ${(props)=>props.theme.bg};    
    color: ${(props)=>props.theme.text};
    border: 1px solid #e5e5e5;
    border-radius: 10px;

    .wrapper header {
        font-size: 23px;
        font-weight: 500;
        padding: 17px 30;
        border-bottom: 1px solid #e5e5e5;
    }

    .wrapper .content {
        padding: 20px 30px;
    }

    .wrapper .content form .from-group {
        margin-bottom: 10px;
    }     

    .form-group label,
    .form-group input {
      width: 100%;
      display: block;
      margin-bottom: 5px;
      border-radius: 4px;
    }

    
`;