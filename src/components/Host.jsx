import React from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { FiServer, FiInfo, FiHash } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import NewHost2 from '../components/NewHost2';

const Host = ({ _id, hostname, ip, description, brand, mode, refresh }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: _id});
  const [isEditing, setIsEditing] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode || 'edit');

  useEffect(() => {
    if (mode) {
      setCurrentMode(mode);
    }
  }, [mode]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleDelete = async () => {
    console.log('deleting host', _id);
    await fetch(import.meta.env.VITE_API_URI + '/hosts/' + _id, {
      method: 'DELETE'
    })
    // Print response
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    await refresh();
  };

  return (
    <HostContainer 
      ref={setNodeRef} 
      style={style}
      className={currentMode === 'edit' ? 'editing' : ''}
      {...listeners}
      {...attributes}
    >
      <div className='host-content'>
        <div className='host-header'>
          <div className='hostname-container'>
            <FiServer className="icon server-icon" />
            <h2>{hostname}</h2>
          </div>
          {currentMode === 'edit' && (
            <div className='action-buttons'>
              <button className='edit-button' onClick={handleEdit}>
                <BiEdit size={20}/>
              </button>
              <button className='delete-button' onClick={handleDelete}>
                <FaRegTrashAlt size={18}/>
              </button>
            </div>
          )}
        </div>
          <div className='host-details'>
            <div className='detail-item'>
              <FiHash className="icon" />
              <span className='ip-address'>{ip}</span>
            </div>
            {currentMode === 'edit' && (
              <>
                <div className='detail-item description'>
                  <FiInfo className="icon" />
                  <span>{description}</span>
                </div>
                <div className='brand-tag'>
                  {brand}
                </div>
              </>
            )}
          </div>
      </div>

      {isEditing && (
        <NewHost2
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          refresh={refresh}
          initialData={{ _id, hostname, ip, description, brand }}
        />
      )}
    </HostContainer>
  );
};

export default Host;

const HostContainer = styled.div`
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  width: 95%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:not(.editing):hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  .host-content {
    width: 100%;
  }

  .host-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(229, 229, 229, 0.3);
  }

  .hostname-container {
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

  .host-details {
    display: grid;
    grid-template-columns: auto 1fr auto;
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
    }
  }

  .ip-address {
    font-family: monospace;
    font-size: 0.9rem;
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