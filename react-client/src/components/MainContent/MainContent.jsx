import { Routes, Route } from "react-router-dom";

import CONFIG from "./../../CONFIG.json";

import "./MainContent.scss";

import AutoBases from "./../ViewComponents/AutoBases/AutoBases";
import TypesGSM from "./../ViewComponents/TypesGSM/TypesGSM";
import AutoGarages from "./../ViewComponents/AutoGarages/AutoGarages";
import Autos from "./../ViewComponents/Autos/Autos";
import Workers from "./../ViewComponents/Workers/Workers";
import Sheets from "./../ViewComponents/Sheets/Sheets";
import Records from "./../ViewComponents/Records/Records";

import GSMDayGarage from "../ViewComponents/GSMDayGarage/GSMDayGarage.jsx";
import ReportSheet from "../ViewComponents/ReportSheet/ReportSheet.jsx";

const funcRequest = async (url, method = "GET", data = null) => {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const responseFetch = await fetch(`${CONFIG.URL_BACKEND}${url}`, {
      method: method,
      headers: headers,
      body: body,
    });

    return await responseFetch.json();
  } catch (err) {
    console.error(err.message);
  }
};

function MainContent() {
  return (
    <div className="MainContent">
      <Routes>
        <Route path="/" element={<AutoBases funcRequest={funcRequest} />} />
        <Route
          path="/type-gsm"
          element={<TypesGSM funcRequest={funcRequest} />}
        />
        <Route
          path="/autogarages"
          element={<AutoGarages funcRequest={funcRequest} />}
        />
        <Route path="/autos" element={<Autos funcRequest={funcRequest} />} />
        <Route
          path="/workers"
          element={<Workers funcRequest={funcRequest} />}
        />
        <Route path="/sheets" element={<Sheets funcRequest={funcRequest} />} />
        <Route
          path="/records"
          element={<Records funcRequest={funcRequest} />}
        />

        <Route
          path="/gsm-day-garage"
          element={<GSMDayGarage funcRequest={funcRequest} />}
        />
        <Route
          path="/sheet-report"
          element={<ReportSheet funcRequest={funcRequest} />}
        />
      </Routes>
    </div>
  );
}

export default MainContent;
