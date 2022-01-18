import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./MainContent.scss";

import AutoBases from "./../ViewComponents/AutoBases/AutoBases";
import TypesGSM from "./../ViewComponents/TypesGSM/TypesGSM";
import AutoGarages from "./../ViewComponents/AutoGarages/AutoGarages";
import Autos from "./../ViewComponents/Autos/Autos";
import Workers from "./../ViewComponents/Workers/Workers";
import Sheets from "./../ViewComponents/Sheets/Sheets";
import Records from "./../ViewComponents/Records/Records";

const funcRequest = async (url, method = "GET", data = null) => {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const responseFetch = await fetch(url, {
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
        <Route path="/type-gsm" element={<TypesGSM />} />
        <Route path="/autogarages" element={<AutoGarages />} />
        <Route path="/autos" element={<Autos />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/sheets" element={<Sheets />} />
        <Route path="/records" element={<Records />} />

        {/* <Route path="/" element={<AutoBases />} /> */}
        {/* <Route path="/" element={<AutoBases />} /> */}
      </Routes>
    </div>
  );
}

export default MainContent;
