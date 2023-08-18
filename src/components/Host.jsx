import React from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// test
const HostContainer = styled.div`
  background-color: #fff;    
  color: ${(props)=>props.theme.text};
  background: ${(props)=>props.theme.bg};  
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
  width: 100%;; 
  cursor: pointer;
`;

const Host = ({ _id, hostname, ip, description, brand }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: _id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (

    <HostContainer ref={setNodeRef} style={style}
      {...listeners}
      {...attributes}
      >
      <h2>{hostname}</h2>
      <div className='hostInfo'>
      <p>{ip}</p>
      <p>{description}</p>
      <p>{brand}</p>
      </div>

    </HostContainer>
  );
};

export default Host;
