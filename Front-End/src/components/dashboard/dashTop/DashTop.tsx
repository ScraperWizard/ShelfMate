import { MdOutlineMenu } from "react-icons/md";
import './DashTop.scss'
import { useContext } from "react";
// import Sidebar from "../../sidebar/Sidebar";
import { SidebarContext, SidebarProvider } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 




const DashTop = () => {
    const {openSidebar} = useContext(SidebarContext);
      
  return (
    
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">Dashboard</h2>
      </div>
     
    </section>
  )
}

export default DashTop
