import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSearch, placeholder = "Buscar..." }) => {
  return (
    <Container>
      <AiOutlineSearch className="search_icon" size={20} />
      <input 
        type="text" 
        placeholder={placeholder} 
        onChange={(e) => onSearch(e.target.value)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background: ${({theme}) => theme.bg3};
  padding: 5px 10px;
  border-radius: 20px;
  
  input {
    border: none;
    background: none;
    outline: none;
    color: ${({theme}) => theme.text};
    margin-left: 5px;
    width: 200px;
    font-size: 0.9rem;

    &::placeholder {
      color: ${({theme}) => theme.text};
      opacity: 0.7;
    }
  }

  .search_icon {
    color: ${({theme}) => theme.text};
    opacity: 0.8;
  }
`;

export default SearchBar;