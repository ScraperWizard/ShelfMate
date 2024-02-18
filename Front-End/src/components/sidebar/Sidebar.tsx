import React, { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { LIGHT_THEME } from '../../constants/themeConstants';
import LogoBlue from '../../assets/logo_blue.svg';
import LogoWhite from '../../assets/logo_white.svg';
import { MdOutlineAttachMoney, MdOutlineBarChart, MdOutlineClose, MdOutlineCurrencyExchange, MdOutlineGridView, MdOutlineLogout, MdOutlineMessage, MdOutlinePeople, MdOutlineSettings, MdOutlineShoppingBag } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { SidebarContext } from '../../context/SidebarContext';
const Sidebar = () => {
  const {theme} = useContext(ThemeContext);
  const {isSidebarOpen, closeSidebar} = useContext(SidebarContext);
  const navbarRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (
      navbarRef.current &&
      (navbarRef.current as HTMLElement).contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
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
          <img src={theme === LIGHT_THEME ? LogoBlue: LogoWhite} alt="" />
          <span className='sidebar-brand-text'>Tabernam</span>
        </div>
        <button className='sidebar-close-btn' onClick={closeSidebar}>
          <MdOutlineClose size={25}></MdOutlineClose>
        </button>
      </div>
      
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Statistics</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney size={20} />
                </span>
                <span className="menu-link-text">Payment</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineCurrencyExchange size={18} />
                </span>
                <span className="menu-link-text">Transactions</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Products</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Customer</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
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
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Settings</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
