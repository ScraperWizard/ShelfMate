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
          <span className='sidebar-brand-text'>Pro Library system</span>
        </div>
        <button className='sidebar-close-btn' onClick={closeSidebar}>
        <MdOutlineClose size={24} />
        </button>
      </div>
      
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            
            <li className="menu-item"
            
            >
              <Link to="/admin/add-book-admin" className={`menu-link ${activeLink === 'books' ? 'active' : ''}`} onClick={() => handleLinkClick('books')}>
                <span className="menu-link-icon">
                <MdOutlineBook size={20} />
                </span>
                <span className="menu-link-text">Manage Books</span>
              </Link>
              
            </li>
            <li className="menu-item">
              <Link to="/admin/meeting-rooms-add" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                <MdOutlineMeetingRoom size={20} />
                </span>
                <span className="menu-link-text">Meeting Rooms</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                <MdOutlineMailOutline size={20} />
                </span>
                <span className="menu-link-text">Requests</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                <MdOutlineAmpStories size={20} />
                </span>
                <span className="menu-link-text">Magazines</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">blank for now</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className={`menu-link ${activeLink === 'users' ? 'active' : ''}`}>
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Messages</span>
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
                    <span className="menu-link-text"  onClick={() => context.setAccessToken(undefined)}>Logout</span>
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
