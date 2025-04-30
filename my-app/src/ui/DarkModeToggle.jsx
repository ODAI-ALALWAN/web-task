import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 cursor-pointer rounded-full hover:bg-[var(--color-bg)] dark:hover:bg-[var(--color-bg)] transition-colors"
    >
      {isDarkMode ? (
        <HiOutlineSun className="w-5 h-6 text-yellow-400" />
      ) : (
        <HiOutlineMoon className="w-5 h-6 text-gray-900 shadow-xl" />
      )}
    </button>
  );
}

export default DarkModeToggle;