import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Chart from "./pages/Chart";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<About />} />
        <Route path="home" element= {<Home />} />
        <Route path="predict" element={<Predict />} />
        <Route path="chart" element={<Chart />} />
        {/* <Route path="about" element={<Segmentation />} /> */}

        {/* Dễ thêm sau này: */}
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
