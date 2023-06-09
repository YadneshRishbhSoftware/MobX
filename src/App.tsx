import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./Components/AppRoutes";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Login } from "./Components/Login";

export const App = observer(() => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <AppRoutes />
        <Footer />
        {/* <Login/> */}
      </div>
    </BrowserRouter>
  );
});
