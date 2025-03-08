import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';// Asegúrate de tener tu archivo de estilos
import {Hosts} from '../pages/Hosts';

function NewConnection({isOpen, onClose, refresh, conn}) {

  const [isVisible, setIsVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ left: null, top: null });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Calcular las dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calcular la posición inicial para que esté en el centro
    const initialLeft = (windowWidth - containerRef.current.offsetWidth) / 2;
    const initialTop = (windowHeight - containerRef.current.offsetHeight) / 2;

    // Establecer la posición inicial
    setPosition({ left: initialLeft, top: initialTop });

    setIsVisible(true);

    // Establece los valores iniciales de los campos del formulario al editar
    if (conn) {
      setIsEditing(true);
    }

  }, [conn]);

  function handleDrag(event) {
    if (dragging) {
      const { movementX, movementY } = event;
      setPosition(prevPosition => ({
        left: prevPosition.left + movementX,
        top: prevPosition.top + movementY
      }));
    }
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
    }
  
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [dragging]);

  function handleMouseUp() {
    setDragging(false);
  }

  return (
    <Container 
      ref={containerRef}
      style={{ 
        left: `${position.left}px`, 
        top: `${position.top}px`,
        visibility: isVisible ? 'visible' : 'hidden'
    }}
    >
      <header
        className={dragging ? 'active' : ''}
        onMouseDown={() => setDragging(true)}
        onMouseMove={handleDrag}
      >
        New connection
      </header>

    </Container>
  );
}

export default NewConnection;

const Container = styled.div`
    place-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: auto%;
    height: 80%;
    max-width: 100%;
    max-height: 100%;
    background-color: ${(props)=>props.theme.bg2};    
    color: ${(props)=>props.theme.text};
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0,0,0,0.1);
    overflow: hide;

    header{
      position: sticky;
      top: 0;
      font-size: 23px;
      font-weight: 500;
      padding: 17px 30px;
      border-bottom: 1px solid #ccc;
      cursor: grab;
    }

    header.active{
      cursor: grabbing;
      user-select: none;
    }

    .hosts{
      margin: 2px;
      padding: 10px;
      height: 100%;
      overflow-y: hide;
    }

    
`;