import { NavBarInSm } from "@/components/header/NavBarInSm";
import ProfileDropDown from "@/components/header/ProfileDropDown";
import HeaderActiveBath from "@/components/header/HeaderActiveBath";

const Header = () => {

  return (
    <header className="flex justify-between items-center px-12 py-4 mb-5 ">
      {/* <HeaderActiveBath /> */}
      {/* User Profile Info */}
      <ProfileDropDown />
      {/* Nav Bar In Small Screen  */}
      <div className="block lg:hidden">
        <NavBarInSm />
      </div>
    </header>
  );
};

export default Header;
