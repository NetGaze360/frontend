import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { historyService } from '../utils/historyService';
import { FiServer, FiHardDrive, FiLink, FiClock, FiUser } from 'react-icons/fi';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await historyService.getRecentActions();
        setActivities(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el historial de actividad');
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Función para obtener el icono según el tipo de actividad
  const getIcon = (type) => {
    switch (type) {
      case 'host':
        return <FiServer />;
      case 'switch':
        return <FiHardDrive />;
      case 'connection':
        return <FiLink />;
      default:
        return <FiClock />;
    }
  };

  // Función para obtener el color según el tipo de acción
    const getActionColor = (action) => {
        switch (action) {
        case 'created':
            return '#4CAF50'; // Verde
        case 'deleted':
            return '#f44336'; // Rojo
        case 'restored':
            return '#2196F3'; // Azul
        default:
            return '#757575'; // Gris
        }
    };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) return <Loading>Cargando actividades...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      <Title>Actividad Reciente</Title>
      <Timeline>
        {activities.length === 0 ? (
          <EmptyState>No hay actividades recientes para mostrar</EmptyState>
        ) : (
          activities.map((activity, index) => (
            <ActivityItem key={index}>
              <IconContainer type={activity.type}>
                {getIcon(activity.type)}
              </IconContainer>
              <Content>
                <ActivityText>
                  <strong>{activity.name}</strong> fue
                  <ActionLabel style={{ color: getActionColor(activity.action) }}>
                    {activity.action === 'created' ? ' creado' : 
                    activity.action === 'deleted' ? ' eliminado' : 
                    activity.action === 'restored' ? ' restaurado' : 
                    ' modificado'}
                  </ActionLabel>
                </ActivityText>
                <MetaInfo>
                  <UserInfo>
                    <FiUser />
                    <span>{activity.user}</span>
                  </UserInfo>
                  <TimeInfo>
                    <FiClock />
                    <span>{formatDate(activity.date)}</span>
                  </TimeInfo>
                </MetaInfo>
              </Content>
            </ActivityItem>
          ))
        )}
      </Timeline>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  background: ${props => props.theme.bg};
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: ${props => props.theme.text};
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.bg3};
  &:last-child {
    border-bottom: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  background: ${props => {
    switch (props.type) {
      case 'host':
        return props.theme.netgaze + '22';
      case 'switch':
        return '#4CAF50' + '22';
      case 'connection':
        return '#FF9800' + '22';
      default:
        return props.theme.bg3;
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'host':
        return props.theme.netgaze;
      case 'switch':
        return '#4CAF50';
      case 'connection':
        return '#FF9800';
      default:
        return props.theme.text;
    }
  }};
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  margin-bottom: 5px;
  color: ${props => props.theme.text};
`;

const ActionLabel = styled.span`
  font-weight: 500;
  margin-left: 4px;
  margin-right: 4px;
`;

const MetaInfo = styled.div`
  display: flex;
  font-size: 0.8rem;
  color: ${props => props.theme.text}aa;
  gap: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Loading = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.text}aa;
`;

const Error = styled.div`
  padding: 20px;
  text-align: center;
  color: #f44336;
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.text}aa;
`;

export default ActivityFeed;