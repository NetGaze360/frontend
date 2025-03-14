import styled from 'styled-components';
import logo from '../assets/lblue_lgNetGaze.png';
import {v} from '../styles/Variables';
import {AiOutlineLeft, AiOutlineHome, AiOutlineApartment, AiOutlineSetting} from 'react-icons/ai';
import {MdOutlineAnalytics, MdLogout} from 'react-icons/md';
import {FiServer} from 'react-icons/fi';
import {NavLink, useLocation} from 'react-router-dom';
import { useContext } from "react";
import { ThemeContext } from '../App';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export function Sidebar({sidebarOpen, setSidebarOpen, setPage} ){

    const navigate = useNavigate();
    const { logout } = useAuth();

    const ModSidebaropen=() =>{
        setSidebarOpen(!sidebarOpen);
    };

    const {setTheme, theme} = useContext(ThemeContext);

    const CambiarTheme=()=>{
        setTheme((theme)=>(theme === "light" ? "dark" : "light"));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    //#region CONFIG LINKS
    const configLinksArray = [
        {
            label: 'Configuración',
            icon: <AiOutlineSetting/>,
            to: '/settings',
        },
        {
            label: 'Cerrar Sesión',
            icon: <MdLogout/>,
            to: '#',
            action: handleLogout,
        },
    ]

    //#endregion CONFIG LINKS

return (
    <Container $isOpen = {sidebarOpen} $themeUse={theme}>
        <button className='Sidebarbutton'
            onClick={ModSidebaropen}>
            <AiOutlineLeft/>
        </button>
        <div className='Logocontent'>
            <div className='imgcontent'>
                <img src={logo} width="200"/>
            </div>
            <h2>
                NetGaze360
            </h2>
        </div>
            {linksArray.map(({icon, label, to}) => (
                <div className='LinkContainer' key={label}>
                    <NavLink to={to} className = {({isActive}) => `Links${isActive?` active`:``}`}
                        onClick={()=>setPage(label)}
                    >
                        <div className='Linkicon'>
                            {icon}
                        </div>
                        {
                            sidebarOpen && (
                                <span>{label}</span>
                            )
                        }
                    </NavLink>
                </div>
            ))}
        <Divider/>
        {configLinksArray.map(({icon, label, to, action}) => (
            <div className='LinkContainer' key={label}>
                {action ? (
                    <button className="Links" onClick={action}>
                        <div className='Linkicon'>
                            {icon}
                        </div>
                        {sidebarOpen && <span>{label}</span>}
                    </button>
                ) : (
                    <NavLink to={to} className={({isActive}) => `Links${isActive?` active`:``}`}>
                        <div className='Linkicon'>
                            {icon}
                        </div>
                        {sidebarOpen && <span>{label}</span>}
                    </NavLink>
                )}
            </div>
        ))}
        <Divider/>
        <div className='Themecontent'>
            {sidebarOpen && <span className='titletheme'>Dark mode</span>}
            <div className="Togglecontent">
                <div className="grid theme-container">
                        <div className="demo">
                            <label className='switch' istheme={theme}>
                                <input 
                                    istheme={theme}
                                    type="checkbox" 
                                    className='theme-switcher'
                                    onClick={CambiarTheme}>
                                </input>
                                <span istheme={theme} className='slider round'></span>
                            </label>
                        </div>
                </div>
            </div>
        </div>
    </Container>
    );
}

//#region LINKS
const linksArray = [
    {
        label: 'Home',
        icon: <AiOutlineHome/>,
        to: '/',
    },
    {
        label: 'Hosts',
        icon: <FiServer/>,
        to: '/hosts',
    },
    {
        label: 'Switches',
        icon: <AiOutlineApartment/>,
        to: '/switches',
    },
]

//#endregion LINKS

//#region STYLED COMPONENTS
const Container = styled.div`
    color: ${(props)=>props.theme.text};
    background: ${(props)=>props.theme.bg};
    position: sticky;
    padding-top: 10px;
    .Sidebarbutton{
        position: absolute;
        top: ${v.xxlSpacing};
        right: -20px;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${(props)=>props.theme.bgtderecha};
        box-shadow: 0 0 4px ${(props)=>props.theme.bg3},
                    0 0 7px ${(props)=>props.theme.bg};
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.5s;
        transform: ${({$isOpen}) => ($isOpen ? 'initial' : 'rotate(180deg)')};
        border: none;
        letter-spacing: inherit;
        color: ${(props)=>props.theme.primary};
        font-size: inherit;
        text-align: inherit;
        padding: 0;
        font-family: inherit;
        outline: none;
        z-index: 0;
    }
    .Sidebarbutton:hover{
        background: ${(props)=>props.theme.bgtderechaHover};
    }

    .Logocontent{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: ${v.lgSpacing};
        .imgcontent {
            img{
                max-width: 100%;
                height: auto;
                padding-top: 6px;
            }
            cursor:pointer;
            transition: all 0.5s;
            transform: ${({$isOpen}) => ($isOpen ? 'scale(0.6)' : 'scale(0.5)')};
        }
        h2{
            display: ${({$isOpen}) => ($isOpen ? 'block' : 'none')};
            padding-right: 60px;
        }
    }
    .LinkContainer{
        margin: 8px 0;
        padding: 0 ${({$isOpen}) => ($isOpen ? '15%' : '25%')};
        :hover{
            background: ${(props)=>props.theme.bg3};
            box-shadow: 0 0 4px ${(props)=>props.theme.bg3},
        }
        .Links{
            color:${(props)=>props.theme.text};
            display: flex;
            align-items: center;
            justify-content: ${({$isOpen}) => ($isOpen ? '' : 'center')};
            text-decoration: none;
            padding: calc(${v.smSpacing} - 2px) 0;

            width: 100%;
            background: none;
            border: none;
            cursor: pointer;
            font-size: inherit;
            font-family: inherit;
            text-align: left;

            .Linkicon{
                padding: ${v.smSpacing} ${v.smSpacing};
                display: flex;
                svg{
                    font-size: 25px;
                }
            }
            &.active{
                .Linkicon{
                    svg{
                        color:${(props)=>props.theme.netgaze};
                    }
                }
            }
        }
    }
    .Themecontent{
        display: flex;
        align-items: center;
        justtify_content:space-between;
        .titletheme{
            display: block;
            padding: 10px;
            font-weight: 700;
            opacity: ${({$isOpen}) => ($isOpen ? '1' : '0')};
            transition: all 0.3s;
            white-space: nowrap;
            overflow: hidden;
        }
        .Togglecontent{
            margin: ${({$isOpen}) => ($isOpen ? 'auto 40px' : 'auto 15px')};
            width: 36px;
            height: 20px;
            border-radius: 10px;
            transition: all 0.3s;
            position: relative;
            .theme-container{
                background-blend-mode: multiply, multiply;
                transition: 0.4s;
                .grid{
                    display: grid;
                    justify-items: center;
                    align-content: center;
                    height: 100vh;
                    width: 100vw;
                    font-family: 'Lato', sans-serif;
                }
                .demo{
                    font-size: 32px;
                    .switch{
                        position: relative;
                        display: inline-block;
                        width: 60px;
                        height: 34px;
                        .theme-switcher{
                            opacity: 0;
                            width: 0;
                            height: 0;
                            &:checked + .slider:before{
                                left: 4px;
                                content: "🌑";
                                transform: translateX(26px);
                            }
                        }
                        .slider{
                            position: absolute;
                            cursor: pointer;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: ${({ themeUse }) =>
                            themeUse === "light" ? v.lightcheckbox : v.checkbox};
                            transition: 0.4s;
                            &::before{
                                position: absolute;
                                content: "☀️";
                                height: 0px;
                                width: 0px;
                                left: -10px;
                                top: 16px;
                                line-height: 0px;
                            }
                            &.round{
                                border-radius: 34px;
                                &:before{
                                    border-radius: 50%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: ${(props)=>props.theme.bg3};
    margin: ${v.lgSpacing} 0;
`;

//#endregion STYLED COMPONENTS