import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/lblue_lgNetGaze.png';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Por favor, complete todos los campos');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Importante para las cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Utilizar el contexto de autenticación
      login(data.user, data.accessToken);
      
      // Redirigir al dashboard
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoContainer>
          <img src={logo} alt="NetGaze360 Logo" />
          <h1>NetGaze360</h1>
        </LogoContainer>

        <h2>Iniciar Sesión</h2>

        {error && (
          <ErrorMessage>
            <FiAlertCircle />
            <span>{error}</span>
          </ErrorMessage>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon>
              <FiUser />
            </InputIcon>
            <Input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <RegisterLink>
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.bgtotal};
`;

const LoginCard = styled.div`
  width: 400px;
  padding: 2.5rem;
  background: ${props => props.theme.bg};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.text};
    font-size: 1.5rem;
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  img {
    width: 100px;
    height: auto;
    margin-bottom: 0.5rem;
  }

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${props => props.theme.netgaze};
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.text}aa;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid ${props => props.theme.bg3};
  background: ${props => props.theme.bg2};
  color: ${props => props.theme.text};
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.netgaze};
    box-shadow: 0 0 0 2px ${props => props.theme.netgaze}22;
  }

  &::placeholder {
    color: ${props => props.theme.text}66;
  }
`;

const Button = styled.button`
  background: ${props => props.theme.netgaze};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffebee;
  color: #d32f2f;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.text}cc;

  a {
    color: ${props => props.theme.netgaze};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Login;
