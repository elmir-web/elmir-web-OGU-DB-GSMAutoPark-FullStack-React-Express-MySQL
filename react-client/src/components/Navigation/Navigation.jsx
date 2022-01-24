import { Link } from "react-router-dom";

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
        <br />
        <Link to="/gsm-day-garage">ГСМ за день по гаражу</Link>
        <Link to="/sheet-report">Отчет по ведомостям</Link>
      </nav>
    </div>
  );
}

export default Navigation;
