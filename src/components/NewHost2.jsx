import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiX, FiServer, FiHash, FiInfo, FiBox, FiTag, FiCpu, FiMapPin } from 'react-icons/fi';

function DraggableDiv({isOpen, onClose, refresh, initialData}) {
  const [isVisible, setIsVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ left: null, top: null });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const initialLeft = (windowWidth - containerRef.current.offsetWidth) / 2;
    const initialTop = (windowHeight - containerRef.current.offsetHeight) / 2;
    setPosition({ left: initialLeft, top: initialTop });
    setIsVisible(true);

    if (initialData) {
      setIsEditing(true);
      document.getElementById('name').value = initialData.hostname;
      document.getElementById('ip').value = initialData.ip;
      document.getElementById('description').value = initialData.description;
      document.getElementById('brand').value = initialData.brand;
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

  const handleCreateHost = () => {
    const newHostData = {
      hostname: document.getElementById('name').value,
      ip: document.getElementById('ip').value,
      description: document.getElementById('description').value,
      brand: document.getElementById('brand').value,
      model: document.getElementById('model').value,
      serial: document.getElementById('serial').value,
      location: document.getElementById('location').value,
    };
  
    const url = isEditing 
      ? `${import.meta.env.VITE_API_URI}/hosts/${initialData._id}`
      : `${import.meta.env.VITE_API_URI}/hosts`;

    fetch(url, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHostData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        onClose();
        refresh();
      })
      .catch(err => console.error(err));
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
      >
        <div className="header-content">
          <FiServer className="header-icon" />
          <h2>{isEditing ? 'Edit Host' : 'Add Host'}</h2>
        </div>
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>
      </header>

      <FormContent>
        <div className="form-group">
          <div className="input-group">
            <FiServer className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="name">Hostname</label>
              <input type="text" id="name" placeholder="Enter hostname" />
            </div>
          </div>

          <div className="input-group">
            <FiHash className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="ip">IP Address</label>
              <input type="text" id="ip" placeholder="Enter IP address" />
            </div>
          </div>

          <div className="input-group">
            <FiInfo className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="description">Description</label>
              <input type="text" id="description" placeholder="Enter description" />
            </div>
          </div>

          <div className="input-group">
            <FiBox className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" placeholder="Enter brand" />
            </div>
          </div>

          <div className="input-group">
            <FiTag className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="model">Model</label>
              <input type="text" id="model" placeholder="Enter model" />
            </div>
          </div>

          <div className="input-group">
            <FiCpu className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="serial">Serial</label>
              <input type="text" id="serial" placeholder="Enter serial number" />
            </div>
          </div>

          <div className="input-group">
            <FiMapPin className="field-icon" />
            <div className="input-wrapper">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" placeholder="Enter location" />
            </div>
          </div>
        </div>
      </FormContent>

      <Footer>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="submit-button" onClick={handleCreateHost}>
          {isEditing ? 'Update' : 'Create'}
        </button>
      </Footer>
    </Container>
);
}

const Container = styled.div`
  position: absolute;
  width: 420px;
  background: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: ${props => props.theme.bg};
    border-bottom: 1px solid ${props => props.theme.gray600}33;
    cursor: grab;

    &.active {
      cursor: grabbing;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;

      .header-icon {
        font-size: 1.5rem;
        color: ${props => props.theme.netgaze};
      }

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
    }

    .close-button {
      background: none;
      border: none;
      color: ${props => props.theme.text};
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background: ${props => props.theme.gray600}22;
      }
    }
  }
`;

const FormContent = styled.div`
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .input-group {
    display: flex;
    align-items: center;
    gap: 12px;

    .field-icon {
      width: 16px;
      height: 16px;
      color: ${props => props.theme.netgaze};
      opacity: 0.8;
      margin-top: 8px; // Ajustado para alinear con el input
    }

    .input-wrapper {
      flex: 1;

      label {
        display: block;
        margin-bottom: 6px;
        font-size: 0.875rem;
        color: ${props => props.theme.text}cc;
      }

      input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid ${props => props.theme.gray600}66;
        border-radius: 6px;
        background: ${props => props.theme.bg};
        color: ${props => props.theme.text};
        font-size: 0.95rem;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: ${props => props.theme.netgaze};
          box-shadow: 0 0 0 2px ${props => props.theme.netgaze}22;
        }

        &::placeholder {
          color: ${props => props.theme.text}66;
        }
      }
    }
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid ${props => props.theme.gray600}33;

  button {
    font-size: 0.9rem;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;

    &.cancel-button {
      color: ${props => props.theme.text};
      background: transparent;
      border: 1px solid ${props => props.theme.gray600}66;

      &:hover {
        background: ${props => props.theme.gray600}22;
      }
    }

    &.submit-button {
      color: white;
      background: ${props => props.theme.netgaze};
      border: none;

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
`;

export default DraggableDiv;