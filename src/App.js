import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import StockPrediction from "./pages/StockPrediction";
import LivePrices from "./pages/LivePrices";
import Converter from "./pages/Converter";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={< Home />}></Route>
    <Route exact path='/stockPrediction' element={< StockPrediction />}></Route>
    <Route exact path='/livePrices' element={< LivePrices />}></Route>
    <Route exact path='/converter' element={< Converter />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
