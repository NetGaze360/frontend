// Componente para las conexiones impares de un switch
import React from 'react';
import styled from 'styled-components';

const Connection = ({ connection }) => {

  // Determina si el puerto es par o impar
  const isEvenPort = connection.swPort % 2 === 0;

  // Renderiza la información de una conexión
  return (
    <Container>
      <div className="connection">
        {isEvenPort ? (
            <>
              <div className='evenCol' id='hostname'>{connection.hostname}</div>
              <div className='evenCol' id='ip'>{connection.ip}</div>
              <div className='evenCol' id='vlan'>{connection.vlan}</div>
              <div className='evenCol' id='port'>{connection.swPort}</div>
            </>
          ) : (
            <>
              <div className='oddCol' id='port'>{connection.swPort}</div>
              <div className='oddCol' id='ip'>{connection.ip}</div>
              <div className='oddCol' id='vlan'>{connection.vlan}</div>
              <div className='oddCol' id='hostname'>{connection.hostname}</div>
            </>
          )}
      </div>
    </Container>
  );
};

export { Connection };

const Container = styled.div`
padding: 2px;
border: 1px solid #e5e5e5;
border-radius: 5px;
margin: 5px;
weight: 100%;
height: 30px;
color: ${(props)=>props.theme.text};
background: ${(props)=>props.theme.bg};  

.connection {
  display: flex; 
  justify-content: space-between;
  align-items: center;
}
.oddCol {
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
  border-right: 1px solid #e5e5e5;
  text-align: center;
  align-items: center;
}

.evenCol {
  margin-right: 5px;
  margin-left: 5px;
  padding-left: 5px;
  border-left: 1px solid #e5e5e5;
  text-align: center;
  align-items: center;
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
  border-left: none;
}

`;