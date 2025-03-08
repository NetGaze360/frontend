import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiX, FiServer } from 'react-icons/fi';

function FloatingLayout({ 
  isOpen, 
  onClose, 
  title = 'Floating Window', 
  headerIcon = FiServer, 
  children, 
  onSubmit, 
  submitLabel = 'Submit',
  cancelLabel = 'Cancel'
}) {
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ left: null, top: null });

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const initialLeft = (windowWidth - containerRef.current.offsetWidth) / 2;
    const initialTop = (windowHeight - containerRef.current.offsetHeight) / 2;
    setPosition({ left: initialLeft, top: initialTop });
  }, []);

  function handleDrag(event) {
    if (dragging) {
      const { movementX, movementY } = event;
      setPosition(prevPosition => ({
        left: prevPosition.left + movementX,
        top: prevPosition.top + movementY
      }));
    }
  }

  function handleMouseUp() {
    setDragging(false);
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [dragging]);

  return (
    <Container 
      ref={containerRef}
      style={{ 
        left: `${position.left}px`, 
        top: `${position.top}px`
      }}
    >
      <header
        className={dragging ? 'active' : ''}
        onMouseDown={() => setDragging(true)}
        onMouseMove={handleDrag}
      >
        <div className="header-content">
          {React.createElement(headerIcon, { className: "header-icon" })}
          <h2>{title}</h2>
        </div>
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>
      </header>

      <Content>
        {children}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: auto;
  height: 80%;
  max-width: 100%;
  max-height: 100%;
  background-color: ${(props)=>props.theme.bg2};    
  color: ${(props)=>props.theme.text};
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0,0,0,0.1);
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

const Content = styled.div`
  padding: 20px;
  height: 100%;
  overflow: hidden;
`;

export default FloatingLayout;