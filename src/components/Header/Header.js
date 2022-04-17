import "./Header.css";

import { ReactComponent as BarIcon } from "../../assets/bars-solid.svg";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header-button" onClick={props.onOpenNav}>
        <BarIcon />
      </div>
    </header>
  );
};

export default Header;
