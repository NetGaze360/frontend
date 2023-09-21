// Componente para las conexiones pares de un switch
import React from 'react';
import styled from 'styled-components';

const EvenConnection = ({ connection }) => {
  // Renderiza la información de una conexión par
  return (
    <Container>
      <div className="even-connection">
        <div className='col'>{connection.ip}</div>
        <div className='col'>{connection.vlan}</div>
        <div className='col'>{connection.hostname}</div>
        <div className='col'>{connection.swPort}</div>
      </div>
    </Container>
  );
};

export { EvenConnection };

const Container = styled.div`
    top: 0%;
    left: 0%;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    margin: 5px;
    weight: 100%;
    height: 30px;
    color: ${(props)=>props.theme.text};
    background: ${(props)=>props.theme.bg};  
    
  .even-connection {
    display: flex;
    width: 50%; /* Cambiar el ancho al 50% para ocupar la mitad del contenedor padre */
    justify-content: space-between;
    align-items: center; /* Alinea verticalmente al centro */
  }
  .col {
    margin-right: 5px;
    padding-right: 5px;
    border-right: 1px solid #e5e5e5;
    width: 33.33%; /* Cambiar el ancho al 33.33% para dividir en tres columnas */
    text-align: center;
  }
`;