import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styled from 'styled-components';
import { FiLoader } from 'react-icons/fi';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <LoadingContainer>
        <FiLoader className="loading-icon" />
        <p>Cargando...</p>
      </LoadingContainer>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${props => props.theme.text};
  
  .loading-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  p {
    font-size: 1.2rem;
  }
`;

export default PrivateRoute;
