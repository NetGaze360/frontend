import React from 'react';
import styled from 'styled-components';

const Layout = ({ children, page, headerContent }) => {
  return (
    <div className="content">
      <HeaderContainer>
        <div className="title">
          <h1>{page}</h1>
        </div>
        <div className="header-content">
          {headerContent}
        </div>
      </HeaderContainer>
      <BodyContainer>
            {children}
    </BodyContainer>
    </div>
  );
};

const HeaderContainer = styled.div`
  height: 5%;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text};
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom: 1px solid ${({theme}) => theme.bg3};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;

  .header-content {
    position: sticky;
    top: 0;
    z-index: 1;
    color: ${(props)=>props.theme.text};
    margin-left: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
  }
    
`;

const BodyContainer = styled.div`
    overflow-y: auto;
    height: 100%;
    padding-bottom: 80px;

    .body {
        margin-left: 0px;
    }
    `;

export default Layout;