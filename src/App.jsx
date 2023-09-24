import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { MyRoutes } from './routers/routes'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Light, Dark } from './styles/Theme'
import {ThemeProvider} from 'styled-components'

export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState("Home");

  return (
    <>
    <ThemeContext.Provider value={{setTheme, theme}}>
      <ThemeProvider theme={themeStyle}>
        <BrowserRouter>
          <Container className={sidebarOpen?"sidebarState active":""}>
            <Sidebar sidebarOpen = {sidebarOpen} setSidebarOpen={setSidebarOpen} setPage = {setPage}/>   
            <div className='content'>
              <div className='header'>
                <h1>{page}</h1>
              </div>
              <div className='body'>
                <MyRoutes setPage = {setPage}/>
              </div>
            </div>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
    </>
  );
  //test
}
const Container = styled.div`
  display:grid;
  grid-template-columns: 90px auto;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  background: ${({theme})=>theme.bgtotal};
  transition: all 0.3s;
  &.active{
    grid-template-columns: 300px auto;
  }
  color: ${({theme})=>theme.text};

  .content{
    margin-bottom: 500px;
  }

  .header{
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${({theme})=>theme.bgtotal};
    color: ${(props)=>props.theme.text};
    margin-left: 30px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px solid ${(props)=>props.theme.bg3};
  }

  .body{
    margin-left: 30px;
    overflow-y: auto;
    max-height: calc(100vh - 50px); /* Ajusta esta altura según tus necesidades */
  }
`;

export default App
