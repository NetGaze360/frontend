import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { http } from '../utils/httpService';
import { FiSave, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

const SystemSettings = () => {
  const [retentionDays, setRetentionDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isRunningCleanup, setIsRunningCleanup] = useState(false);
  const [cleanupResult, setCleanupResult] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await http.get('/config/deletionRetentionDays');
      if (response.ok) {
        const data = await response.json();
        setRetentionDays(data.value);
      } else {
        setError('Error al cargar la configuración');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      const response = await http.put('/config/deletionRetentionDays', {
        value: parseInt(retentionDays)
      });
      
      if (response.ok) {
        setSuccessMessage('Configuración guardada correctamente');
        // Mostrar el mensaje por 3 segundos
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError('Error al guardar la configuración');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const runCleanup = async () => {
    if (!window.confirm('¿Estás seguro de que deseas ejecutar la limpieza ahora? Esta acción eliminará permanentemente los elementos marcados para eliminación que superen el periodo de retención.')) {
      return;
    }
    
    try {
      setIsRunningCleanup(true);
      setError(null);
      setCleanupResult(null);
      
      const response = await http.post('/admin/run-cleanup');
      
      if (response.ok) {
        const data = await response.json();
        setCleanupResult(data.deletedCounts);
      } else {
        setError('Error al ejecutar la limpieza');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setIsRunningCleanup(false);
    }
  };

  return (
    <Container>
      <Title>Configuración del Sistema</Title>
      
      {error && (
        <ErrorMessage>
          <FiAlertTriangle />
          <span>{error}</span>
        </ErrorMessage>
      )}
      
      {successMessage && (
        <SuccessMessage>
          <span>{successMessage}</span>
        </SuccessMessage>
      )}
      
      <Section>
        <SectionTitle>Retención de datos eliminados</SectionTitle>
        <FormGroup>
          <Label htmlFor="retentionDays">
            Días de retención para elementos eliminados:
          </Label>
          <Input
            id="retentionDays"
            type="number"
            min="1"
            max="365"
            value={retentionDays}
            onChange={e => setRetentionDays(e.target.value)}
            disabled={isLoading}
          />
          <HelpText>
            Los elementos eliminados serán borrados permanentemente después de este número de días.
          </HelpText>
        </FormGroup>

        <ButtonsContainer>
          <Button 
            onClick={saveSettings} 
            disabled={isLoading}
            primary
          >
            <FiSave /> Guardar Configuración
          </Button>
          
          <Button 
            onClick={runCleanup} 
            disabled={isRunningCleanup}
            danger
          >
            <FiRefreshCw /> Ejecutar Limpieza Ahora
          </Button>
        </ButtonsContainer>
        
        {cleanupResult && (
          <CleanupResult>
            <p>Resultados de la limpieza:</p>
            <ul>
              <li>Hosts eliminados permanentemente: {cleanupResult.hosts}</li>
              <li>Switches eliminados permanentemente: {cleanupResult.switches}</li>
              <li>Conexiones eliminadas permanentemente: {cleanupResult.connections}</li>
            </ul>
          </CleanupResult>
        )}
      </Section>
    </Container>
  );
};

// Estilos
const Container = styled.div`
  background: ${props => props.theme.bg};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${props => props.theme.text};
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: ${props => props.theme.text};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.bg3};
  border-radius: 4px;
  background: ${props => props.theme.bg2};
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.netgaze};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const HelpText = styled.div`
  font-size: 0.85rem;
  margin-top: 5px;
  color: ${props => props.theme.text}aa;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${props => props.primary ? props.theme.netgaze : props.danger ? '#f44336' : props.theme.bg3};
  color: ${props => props.primary || props.danger ? 'white' : props.theme.text};
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    filter: brightness(1);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  margin-bottom: 20px;
  background: #ffebee;
  color: #d32f2f;
  border-radius: 4px;
  
  svg {
    font-size: 1.1rem;
  }
`;

const SuccessMessage = styled.div`
  padding: 12px 15px;
  margin-bottom: 20px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
`;

const CleanupResult = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: ${props => props.theme.bg2};
  border-radius: 4px;
  
  p {
    font-weight: 500;
    margin-bottom: 10px;
  }
  
  ul {
    margin-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
`;

export default SystemSettings;