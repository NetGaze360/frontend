import React from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {FaRegTrashAlt} from 'react-icons/fa';
import {BiEdit} from 'react-icons/bi';
import { useState } from 'react';
import NewSwitch from './NewSwitch';

const Switch = ({ _id, name, description, brand, nports, nconnections, refresh }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: _id});
  
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    console.log('Editando');
    setIsEditing(true);
  };
  
  const handleDelete = async () => {
    console.log('Eliminando');
    await fetch(import.meta.env.VITE_API_URI + '/switches/' + _id, {
      method: 'DELETE'
    })
    await refresh();
  };

  return (

    <SwitchContainer ref={setNodeRef} style={style}
      {...listeners}
      {...attributes}
      >
      <div className='switchDiv'>
        <h2>{name}</h2>
        <div className='switchInfo'>
          <p>{description}</p>
          <p>{brand}</p>
          <p>{nports}</p>
          <p>{nconnections}</p>
        </div>
      </div>
      <div className='switchButtons'>
          <div className='editBt' onClick={handleEdit}>
            <BiEdit size={30}/>
          </div>
          <div className='trashBt' onClick={handleDelete} >
            <FaRegTrashAlt size={25}/>
          </div>
      </div>
      {isEditing && (
        <NewSwitch
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          refresh={refresh}
          // Aquí pasa los datos del seleccionado seleccionado para prellenar el formulario
          initialData={{ _id, name, description, brand, nports, nconnections }}
        />
      )}


    </SwitchContainer>
  );
};

export default Switch;

const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;    
  color: ${(props)=>props.theme.text};
  background: ${(props)=>props.theme.bg};  
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 10px;
  width: 95%;
  
  .switchDiv {
    justify-content: space-between;
    margin-right: 50px;
  }
  .switchInfo {
    margin-left: 10px;
  }
  .switchButtons {
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
