import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/lblue_lgNetGaze.png';
import { FiUser, FiLock, FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Validaciones básicas
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, complete todos los campos');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cuenta');
      }

      setSuccess('Cuenta creada correctamente. Redirigiendo...');
      
      // Esperar 2 segundos y redirigir al login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <LogoContainer>
          <img src={logo} alt="NetGaze360 Logo" />
          <h1>NetGaze360</h1>
        </LogoContainer>

        <h2>Crear Cuenta</h2>

        {error && (
          <ErrorMessage>
            <FiAlertCircle />
            <span>{error}</span>
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <FiCheckCircle />
            <span>{success}</span>
          </SuccessMessage>
        )}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon>
              <FiUser />
            </InputIcon>
            <Input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <FiMail />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Registrarse'}
          </Button>
        </form>

        <LoginLink>
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.bgtotal};
`;

const RegisterCard = styled.div`
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

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;

  svg {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const LoginLink = styled.div`
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

export default Register;
