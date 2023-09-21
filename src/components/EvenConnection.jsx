// Componente para las conexiones pares de un switch
import React from 'react';
import styled from 'styled-components';

const EvenConnection = ({ connection }) => {
  // Renderiza la información de una conexión par
  return (
    <Container>
      <div className="even-connection">
      <div className='col' id='hostname'>{connection.hostname}</div>
        <div className='col' id='ip'>{connection.ip}</div>
        <div className='col' id='vlan'>{connection.vlan}</div>
        <div className='col' id='port'>{connection.swPort}</div>
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
    justify-content: space-between;
    align-items: center; /* Alinea verticalmente al centro */
  }
  .col {
    margin-right: 5px;
    margin-left: 5px;
    padding-left: 5px;
    border-left: 1px solid #e5e5e5;
    text-align: center;
  }
  
  #port {
    width: 10%;
    max-width: 30px;
  }
  
  #ip {
    width: 30%;
    min-width: 100px;
  }
  
  #vlan {
    width: 10%;
  }
  
  #hostname {
    width: 50%;
    min width: 100px;
    
    border-left: none;
  }
`;