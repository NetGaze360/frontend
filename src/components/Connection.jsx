import React from 'react';
import styled from 'styled-components';
import { FiMonitor, FiHash, FiLayers } from 'react-icons/fi';

const Connection = ({ connection, isEven }) => {
  const renderContent = () => {
    if (isEven) {
      // Orden para puertos pares: VLAN, Hostname, IP
      return (
        <>
          <div className="info-group vlan">
            <FiLayers className="icon" />
            <span>{connection.vlan || '-'}</span>
          </div>
          <div className="info-group hostname">
            <FiMonitor className="icon" />
            <span>{connection.hostname || 'Sin host'}</span>
          </div>
          <div className="info-group ip">
            <FiHash className="icon" />
            <span>{connection.ip || 'Sin IP'}</span>
          </div>
        </>
      );
    } else {
      // Orden para puertos impares: IP, Hostname, VLAN
      return (
        <>
          <div className="info-group ip">
            <FiHash className="icon" />
            <span>{connection.ip || 'Sin IP'}</span>
          </div>
          <div className="info-group hostname">
            <FiMonitor className="icon" />
            <span>{connection.hostname || 'Sin host'}</span>
          </div>
          <div className="info-group vlan">
            <FiLayers className="icon" />
            <span>{connection.vlan || '-'}</span>
          </div>
        </>
      );
    }
  };

  return (
    <StyledConnection $isEven={isEven}>
      {!isEven && <div className="port-number">{connection.swPort}</div>}
      <div className="connection-content">
        {renderContent()}
      </div>
      {isEven && <div className="port-number">{connection.swPort}</div>}
    </StyledConnection>
  );
};

const StyledConnection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  transition: all 0.2s ease;

  .port-number {
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.netgaze}22;
    color: ${props => props.theme.netgaze};
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .connection-content {
    flex: 1;
    display: flex;
    align-items: center;
    min-height: 40px;
    border: 1px solid ${(props) => props.theme.gray600};
    border-radius: 6px;
    background: ${(props) => props.theme.bg};
    padding: 0.5rem;
  }

  .info-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.75rem;
    height: 100%;
    border-right: 1px solid ${(props) => props.theme.gray600}44;

    &:last-child {
      border-right: none;
    }

    .icon {
      font-size: 0.875rem;
      color: ${(props) => props.theme.netgaze};
      opacity: 0.8;
    }

    span {
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .hostname {
    width: 45%;
    min-width: 100px;
  }

  .ip {
    width: 35%;
    min-width: 120px;
    span {
      font-family: monospace;
    }
  }

  .vlan {
    width: 20%;
    min-width: 60px;
    justify-content: center;

    span {
      font-weight: 500;
    }
  }

  &:hover .connection-content {
    background: ${(props) => props.theme.bgHover};
  }
`;

export { Connection };