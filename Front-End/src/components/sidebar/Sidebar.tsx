import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { LIGHT_THEME } from '../../constants/themeConstants';
import LogoBlue from '../../assets/logo_blue.svg';
import LogoWhite from '../../assets/logo_white.svg';
import { MdOutlineClose, MdOutlineLogout, MdOutlineMessage, MdOutlinePeople, MdOutlineSettings, MdOutlineBook, MdOutlineMeetingRoom, MdOutlineMailOutline, MdOutlineAmpStories} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { SidebarContext } from '../../context/SidebarContext';
import { AuthContext } from '../../context/AuthProvider';
import socket from '../../Socket';
const Sidebar = () => {
  const {theme} = useContext(ThemeContext);
  const {isSidebarOpen, closeSidebar} = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [activeLink, setActiveLink] = useState('');
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  }
  const context = useContext(AuthContext);

  const handleClickOutside = (event: any) => {
    if (
      navbarRef.current &&
      (navbarRef.current as HTMLElement).contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };
  const handleLoggingOut = () => {
    socket.emit("logout");
    socket.on("logout-response", (response: any) => {
      console.log("this is the response from logging out",response);
    })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`} ref={navbarRef}>
      <div className='sidebar-top'>
        <div className='sidebar-brand'>
          {/* <img src={theme === LIGHT_THEME ? LogoBlue: LogoWhite} alt="" /> */}
          <span className='sidebar-brand-text'>SHELFMATE</span>
        </div>
        <button className='sidebar-close-btn' onClick={closeSidebar}>
        <MdOutlineClose size={24} />
        </button>
      </div>
      
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            
          <li className="menu-item">
              <Link to="/admin/view-books" className={`menu-link ${activeLink === 'viewBook' ? 'active' : ''}`} onClick={() => handleLinkClick('viewBook')}>
                <span className="menu-link-icon">
                <MdOutlineMeetingRoom size={20} />
                </span>
                <span className="menu-link-text">view items</span>
              </Link>
            </li>
            <li className="menu-item"
            
            >
              <Link to="/admin/add-book-admin" className={`menu-link ${activeLink === 'books' ? 'active' : ''}`} onClick={() => handleLinkClick('books')}>
                <span className="menu-link-icon">
                <MdOutlineBook size={20} />
                </span>
                <span className="menu-link-text">Manage Items</span>
              </Link>
              
            </li>
            <li className="menu-item">
              <Link to="/admin/meeting-rooms-add" className={`menu-link ${activeLink === 'rooms' ? 'active' : ''}`} onClick={() => handleLinkClick('rooms')}>
                <span className="menu-link-icon">
                <MdOutlineMeetingRoom size={20} />
                </span>
                <span className="menu-link-text">Meeting Rooms</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/get-requests" className={`menu-link ${activeLink === 'Requested' ? 'active' : ''}`} onClick={() => handleLinkClick('Requested')}>
                <span className="menu-link-icon">
                <MdOutlineMailOutline size={20} />
                </span>
                <span className="menu-link-text">View Requested Items</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/admin/due-books" className={`menu-link ${activeLink === 'due' ? 'active' : ''}`} onClick={() => handleLinkClick('due')}>
                <span className="menu-link-icon">
                <MdOutlineMailOutline size={20} />
                </span>
                <span className="menu-link-text">View due books</span>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/admin/view-logs" className={`menu-link ${activeLink === 'logs' ? 'active' : ''}`} onClick={() => handleLinkClick('logs')}>
                <span className="menu-link-icon">
                <MdOutlineMailOutline size={20} />
                </span>
                <span className="menu-link-text">View logs</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin/manageStudents" className={`menu-link ${activeLink === 'blank' ? 'active' : ''}`} onClick={() => handleLinkClick('blank')}>
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Students managements</span>
              </Link>
            </li>
          </ul>
          </div>
          <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin/Settings" className={`menu-link ${activeLink === 'Settings' ? 'active' : ''}`} onClick={() => handleLinkClick('Settings')}>
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">settings</span>
              </Link>
            </li>
            <li className="menu-item">
              {
                context?.accessToken === undefined ? (
                  <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                    <span className="menu-link-icon">
                      <MdOutlineLogout size={20} />
                    </span>
                    <span className="menu-link-text">Login</span>
                  </Link>
                ) : (
                  <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                    <span className="menu-link-icon">
                      <MdOutlineLogout size={20} />
                    </span>
                    <span className="menu-link-text"  onClick={() => {handleLoggingOut();context.setAccessToken(undefined)}}>Logout</span>
                  </Link>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
