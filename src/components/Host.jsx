import React from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {FaRegTrashAlt} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi';

const Host = ({ _id, hostname, ip, description, brand, refresh }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: _id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    console.log('Editando');
  };
  
  const handleDelete = () => {
    console.log('Eliminando');
    fetch(import.meta.env.VITE_API_URI + '/hosts/' + _id, {
      method: 'DELETE'
    })
    refresh();
  };

  return (

    <HostContainer ref={setNodeRef} style={style}
      {...listeners}
      {...attributes}
      >
      <div className='hostDiv'>
        <h2>{hostname}</h2>
        <div className='hostInfo'>
          <p>{ip}</p>
          <p>{description}</p>
          <p>{brand}</p>
        </div>
      </div>
      <div className='hostButtons'>
          <div className='editBt' onClick={handleEdit}>
            <BiEdit size={30}/>
          </div>
          <div className='trashBt' onClick={handleDelete} >
            <FaRegTrashAlt size={25}/>
          </div>
      </div>


    </HostContainer>
  );
};

export default Host;

const HostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;    
  color: ${(props)=>props.theme.text};
  background: ${(props)=>props.theme.bg};  
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
  width: 95%;
  
  .hostDiv {
    justify-content: space-between;
    margin-right: 50px;
  }
  .hostInfo {
    margin-left: 10px;
  }
  .hostButtons {
    margin-right: 30px;
  }

  .editBt {
    cursor: pointer;
    margin-bottom: 10px;
  }
  .editBt:hover {
    color: ${(props)=>props.theme.netgaze};
  }

  .trashBt {
    cursor: pointer;
  }
  .trashBt:hover {
    color: red;
  }

`;
