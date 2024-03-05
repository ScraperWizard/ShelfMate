import { useState } from "react";
import SettingsOptions from "./SettingsOptions";

function SettingsModal({ children }: any) {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div
      className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto"
      data-name="settings"
    >
      <h1 className="border-b py-6 text-4xl font-semibold">Librarian settings</h1>
      <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <div className="relative my-4 w-56 sm:hidden">
          <input
            className="peer hidden"
            type="checkbox"
            name="select-1"
            id="select-1"
          />
        </div>
        
        <div className="col-span-10 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
          {children}
        </div>
        
      </div>
    </div>
  );
}

export default SettingsModal;
