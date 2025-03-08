import React, { useState } from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { FiServer, FiInfo, FiHash, FiList, FiLink } from 'react-icons/fi';
import NewSwitch from './NewSwitch';

const Switch = ({ _id, name, description, brand, nports, nconnections, refresh }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: _id});
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = (e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevent Link navigation
    setIsEditing(true);
  };
  
  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevent Link navigation
    await fetch(import.meta.env.VITE_API_URI + '/switches/' + _id, {
      method: 'DELETE'
    })
    await refresh();
  };

  return (
    <SwitchContainer 
      ref={setNodeRef} 
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className='switch-content'>
        <div className='switch-header'>
          <div className='name-container'>
            <FiServer className="icon server-icon" />
            <h2>{name}</h2>
          </div>
          <div className='action-buttons'>
            <button className='edit-button' onClick={handleEdit}>
              <BiEdit size={20}/>
            </button>
            <button className='delete-button' onClick={handleDelete}>
              <FaRegTrashAlt size={18}/>
            </button>
          </div>
        </div>
        
        <div className='switch-details'>
          <div className='detail-item description'>
            <FiInfo className="icon" />
            <span>{description}</span>
          </div>
          <div className='detail-item'>
            <FiList className="icon" />
            <span>Ports: {nports}</span>
          </div>
          <div className='detail-item'>
            <FiLink className="icon" />
            <span>Connections: {nconnections}</span>
          </div>
          <div className='brand-tag'>
            {brand}
          </div>
        </div>
      </div>

      {isEditing && (
        <NewSwitch
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          refresh={refresh}
          initialData={{ _id, name, description, brand, nports, nconnections }}
        />
      )}
    </SwitchContainer>
  );
};

export default Switch;

const SwitchContainer = styled.div`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  width: 95%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .switch-content {
    width: 100%;
  }

  .switch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(229, 229, 229, 0.3);
  }

  .name-container {
    display: flex;
    align-items: center;
    gap: 12px;

    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .server-icon {
      color: ${(props) => props.theme.netgaze};
    }
  }

  .action-buttons {
    display: flex;
    gap: 8px;

    button {
      background: none;
      color: ${(props) => props.theme.text};
      border: none;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .edit-button:hover {
      color: ${(props) => props.theme.netgaze};
    }

    .delete-button:hover {
      color: #dc3545;
    }
  }

  .switch-details {
    display: grid;
    grid-template-columns: 1fr auto auto auto;
    gap: 16px;
    align-items: center;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(props) => props.theme.text}aa;

    .icon {
      font-size: 1rem;
    }

    &.description {
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      grid-column: 1 / -1;
    }
  }

  .brand-tag {
    background: ${(props) => props.theme.netgaze}22;
    color: ${(props) => props.theme.netgaze};
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .icon {
    font-size: 1.25rem;
  }
`;