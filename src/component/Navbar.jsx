import { NavLink } from "react-router-dom";
import { NavbarData } from "../data/Navbar";

const Navbar = () => {
  return (
    <div className="w-full h-[60px] flex justify-between items-center px-8 bg-[#2D2D2D]">
      {/* Logo Section */}
      <div className="text-2xl font-bold text-white tracking-wider">
        Brain<span className="text-blue-500">Bucket</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-x-10">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold text-xl"
                : "text-white font-medium text-xl"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
