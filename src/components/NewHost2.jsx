import React, { useState } from 'react';
import styled from 'styled-components';// Asegúrate de tener tu archivo de estilos

function DraggableDiv({isOpen, onClose}) {
  
  if (!isOpen) return null;

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ left: 500, top: 500 });

  function handleDrag(event) {
    if (dragging) {
      const { movementX, movementY } = event;
      setPosition(prevPosition => ({
        left: prevPosition.left + movementX,
        top: prevPosition.top + movementY
      }));
    }
  }

  return (
    <Container style={{ left: `${position.left}px`, top: `${position.top}px` }}>
      <header
        className={dragging ? 'active' : ''}
        onMouseDown={() => setDragging(true)}
        onMouseMove={handleDrag}
        onMouseUp={() => setDragging(false)}
      >
        Draggable Div
      </header>
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
      <div className='btDiv'>
        <button>Aceptar</button>
        <button className="modal-cancel-button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Container>
  );
}

export default DraggableDiv;

const Container = styled.div`
    position: absolute;
    width: 20%;
    height: 60%;
    background-color: ${(props)=>props.theme.bg};    
    color: ${(props)=>props.theme.text};
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0,0,0,0.1);

    header{
      font-size: 23px;
      font-weight: 500;
      padding: 17px 30px;
      border-bottom: 1px solid #ccc;
    }

    header.active{
      cursor: move;
      user-select: none;
    }

    .form-group label,
    .form-group input {
      width: 50%;
      display: block;
      margin-bottom: 5px;
      margin-left: 10px;
      border-radius: 4px;
    }

    .btDiv{
      display: flex;
      justify-content: space-around;
    }

    
`;