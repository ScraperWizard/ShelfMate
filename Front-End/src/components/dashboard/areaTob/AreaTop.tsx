import React, { useContext, useEffect, useRef, useState } from 'react'
import './AreaTop.scss'
import { MdOutlineMenu } from 'react-icons/md'
import { SidebarContext } from '../../../context/SidebarContext';
const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection",
  //   },
  // ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  // const handleClickOutside = (event: any) => {
  //   if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
  //     setShowDatePicker(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
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
      {/* <h2 className="area-top-title">Dashboard</h2> */}
    </div>
    {/* <div className="area-top-r">
      <div
        ref={dateRangeRef}
        className={`date-range-wrapper ${
          !showDatePicker ? "hide-date-range" : ""
        }`}
        onClick={handleInputClick}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          showMonthAndYearPickers={false}
        />
      </div>
    </div> */}
  </section>
  )
}

export default AreaTop
