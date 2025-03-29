import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ActivityFeed from '../components/ActivityFeed';
import { FiServer, FiHardDrive, FiUsers } from 'react-icons/fi';

export function Home() {
  return (
    <Layout page={'Dashboard'}>
      <Container>
        <StatisticsSection>
          <StatCard>
            <StatIcon className="hosts">
              <FiServer />
            </StatIcon>
            <StatContent>
              <StatTitle>Hosts</StatTitle>
              <StatValue>24</StatValue>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon className="switches">
              <FiHardDrive />
            </StatIcon>
            <StatContent>
              <StatTitle>Switches</StatTitle>
              <StatValue>8</StatValue>
            </StatContent>
          </StatCard>
          
          <StatCard>
            <StatIcon className="users">
              <FiUsers />
            </StatIcon>
            <StatContent>
              <StatTitle>Usuarios</StatTitle>
              <StatValue>5</StatValue>
            </StatContent>
          </StatCard>
        </StatisticsSection>
        
        <ActivitySection>
          <ActivityFeed />
        </ActivitySection>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const StatisticsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${props => props.theme.bg};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  
  &.hosts {
    background: ${props => props.theme.netgaze}22;
    color: ${props => props.theme.netgaze};
  }
  
  &.switches {
    background: #4CAF5022;
    color: #4CAF50;
  }
  
  &.users {
    background: #9C27B022;
    color: #9C27B0;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StatContent = styled.div``;

const StatTitle = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.text}aa;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const ActivitySection = styled.div``;