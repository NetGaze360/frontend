// Componente para las conexiones impares de un switch
import React from 'react';
import styled from 'styled-components';

const OddConnection = ({ connection }) => {
  // Renderiza la información de una conexión impar
  return (
    <Container>
      <div className="odd-connection">
      <div className='col' id='port'>{connection.swPort}</div>
        <div className='col'id = 'ip'>{connection.ip}</div>
        <div className='col' id='vlan'>{connection.vlan}</div>
        <div className='col' id='hostname'>{connection.hostname}</div>
      </div>
    </Container>
  );
};

export { OddConnection };

const Container = styled.div`
top: 50%;
left: 50%;
border: 1px solid #e5e5e5;
border-radius: 5px;
margin: 5px;
weight: 100%;
height: 30px;
color: ${(props)=>props.theme.text};
background: ${(props)=>props.theme.bg};  

.odd-connection {
  display: flex; 
  justify-content: space-between;
  align-items: center; /* Alinea verticalmente al centro */
}
.col {
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
  border-right: 1px solid #e5e5e5;
  text-align: center;
}

#port {
  width: 10%;
  max-width: 30px;
}

#ip {
  width: 30%;
}

#vlan {
  width: 10%;
}

#hostname {
  width: 50%;
  border-right: none;
}

`;