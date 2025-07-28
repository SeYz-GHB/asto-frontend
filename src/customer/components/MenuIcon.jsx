import { BsMouse } from "react-icons/bs";
import { FaRegKeyboard } from "react-icons/fa";
import { GiHeadphones } from "react-icons/gi";
import { LuMonitor } from "react-icons/lu";
import mousepadIcon from '../../assets/mousepadIcon.png';
import { Link } from "react-router-dom";

const categories = [
  { label: "Mouse", icon: <BsMouse />, slug: "mouse" },
  { label: "Mouse Pad", icon: <div className="w-6 h-6 md:w-10 md:h-9 bg-gray-300 rounded"></div>, slug: "mousepad" },
  { label: "Keyboard", icon: <FaRegKeyboard />, slug: "keyboard" },
  { label: "Headphone", icon: <GiHeadphones />, slug: "headphone" },
  { label: "Monitor", icon: <LuMonitor />, slug: "monitor" },
];


const MenuIcon = ({ activeCategory }) => {
  return (
    <div className="flex gap-6 justify-center mt-5 flex-wrap md:gap-10">
      {categories.map((item) => (
        <Link key={item.label} to={`/category/${item.slug}`}>
          <div
            className={`flex flex-col items-center cursor-pointer transition duration-200 ${
              activeCategory === item.slug
                ? "text-black font-semibold"
                : "text-gray-400"
            }`}
          >
            <div className="text-2xl md:text-4xl">{item.icon}</div>
            <div className="text-sm">{item.label}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};


export default MenuIcon;