import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./Navigation.scss";

function Navigation() {
  return (
    <div className="Navigation">
      <nav className="nav">
        <Link to="/">Автомобильные базы</Link>
        <Link to="/type-gsm">Виды ГСМ</Link>
        <Link to="/autogarages">Автомобильные гаражи</Link>
        <Link to="/autos">Все автомобили</Link>
        <Link to="/workers">Рабочий персонал</Link>
        <Link to="/sheets">Ведомости</Link>
        <Link to="/records">Путевые листы</Link>
      </nav>
    </div>
  );
}

export default Navigation;
