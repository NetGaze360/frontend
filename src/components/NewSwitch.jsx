import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';// Asegúrate de tener tu archivo de estilos

function DraggableDiv({isOpen, onClose, refresh, initialData}) {

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
    if (initialData) {
      setIsEditing(true);
      document.getElementById('name').value = initialData.name;
      document.getElementById('description').value = initialData.description;
      document.getElementById('brand').value = initialData.brand;
      document.getElementById('nports').value = initialData.nports;
      document.getElementById('nconnections').value = initialData.nconnections;
    }

  }, [initialData]);

  function handleDrag(event) {
    if (dragging) {
      const { movementX, movementY } = event;
      setPosition(prevPosition => ({
        left: prevPosition.left + movementX,
        top: prevPosition.top + movementY
      }));
    }
  }

  const handleCreateSwitch = () => {
    const newSwitchData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      brand: document.getElementById('brand').value,
      nports: parseInt(document.getElementById('nports').value),
      nconnections: parseInt(document.getElementById('nconnections').value),
    };

    if (isEditing) {
      fetch(import.meta.env.VITE_API_URI + '/switches/' + initialData._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSwitchData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          onClose();
          refresh();
        })
        .catch(err => console.error(err));
    } else {
      fetch(import.meta.env.VITE_API_URI + '/switches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSwitchData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          onClose();
          refresh();
        })
        .catch(err => console.error(err));
    }
  };

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
        onMouseUp={() => setDragging(false)}
      >
        Switch
      </header>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" />

          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Description" />

          <label htmlFor="brand">Brand</label>
          <input type="text" id="brand" placeholder="Brand" />

          <label htmlFor="nports">Ports</label>
          <input type="number" id="nports" placeholder="Number of Ports" />

          <label htmlFor="nconnections">Number of Connections</label>
          <input type="number" id="nconnections" placeholder="Number of Connections" />
        </div>
      </form>
      <div className='btDiv'>
        <button id='btAccept' onClick={handleCreateSwitch}>Aceptar</button>
        <button id='btCancel' className="modal-cancel-button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Container>
  );
}

export default DraggableDiv;

const Container = styled.div`
    place-items: center;
    position: absolute;
    width: 300px;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    background-color: ${(props)=>props.theme.bg};    
    color: ${(props)=>props.theme.text};
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0,0,0,0.1);
    overflow: auto;

    header{
      font-size: 23px;
      font-weight: 500;
      padding: 17px 30px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
    }

    header.active{
      cursor: move;
      user-select: none;
    }

    form{
      display: flex;
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 35px;
    }
  

    .form-group{
      justify-content: ;
      align-items: center;


    }

    .form-group label{
      width: 50%;
      display: block;
      margin-bottom: 5px;
      margin-left: 10px;
      border-radius: 4px;
    }
    .form-group input {
      width: 100%;
      display: block;
      margin-bottom: 5px;
      margin-left: 10px;
      border-radius: 4px;
    }

    .btDiv{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20px;
    }

    button{
      width: auto;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      padding: 0 10px;
      height: 30px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }

    #btAccept{
      background-color: #4CAF50;
      color: white;
    }

    #btAccept:hover{
      background-color: #45a049;
    }

    #btCancel{
      background-color: #f44336;
      color: white;
    }

    #btCancel:hover{
      background-color: #da190b;
    }

    
`;