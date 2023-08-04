import React from 'react';
import styled from 'styled-components';

const HostContainer = styled.div`
  /* Aquí puedes agregar los estilos que necesites */
`;

const Host = ({ hostname, ip, description, brand }) => (
  <HostContainer>
    <h2>{hostname}</h2>
    <p>{ip}</p>
    <p>{description}</p>
    <p>{brand}</p>
  </HostContainer>
);

export default Host;