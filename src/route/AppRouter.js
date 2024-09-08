import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../layout/Common.css';
import '../layout/Login.css';

import MainPage from "../component/MainPage";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Login from "../component/Login";
import Join from "../component/Join";

const AppRouter = () => {
    return (
    <Router>
        <div className="body">
        <Header />

        <Routes>

            <Route path="/" element={ <MainPage /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/join" element={ <Join /> } />

        </Routes>

        <Footer />
        </div>
    </Router>
    );
}

export default AppRouter;