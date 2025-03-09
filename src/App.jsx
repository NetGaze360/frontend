import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { MyRoutes } from './routers/routes'
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Light, Dark } from './styles/Theme'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './components/AuthContext'

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
        <AuthProvider>
          <BrowserRouter>
            <MyRoutes setPage={setPage} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
    </>
  );
}

export default App