// Componente para las conexiones impares de un switch
import React from 'react';
import styled from 'styled-components';

const OddConnection = ({ connection }) => {
  // Renderiza la información de una conexión impar
  return (
    <Container>
      <div className="odd-connection">
      <div className='col'>{connection.swPort}</div>
        <div className='col'>{connection.ip}</div>
        <div className='col'>{connection.vlan}</div>
        <div className='col'>{connection.hostname}</div>
      </div>
    </Container>
  );
};

export { OddConnection };

const Container = styled.div`
top: 50%;
left: 50%;
border: 1px solid black;
border-radius: 5px;
margin: 5px;
weight: 100%;
height: 30px;
color: ${(props)=>props.theme.text};
background: ${(props)=>props.theme.bg};  

.odd-connection {
  display: flex;
  width: 50%; /* Cambiar el ancho al 50% para ocupar la mitad del contenedor padre */
  justify-content: space-between;
  align-items: center; /* Alinea verticalmente al centro */
}
.col {
  margin-right: 5px;
  padding-right: 5px;
  border-right: 1px solid black;
  width: 33.33%;
  text-align: center;
}
`;