import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../layout/Common.css';
import '../layout/Login.css';

import MainPage from "../component/MainPage";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Login from "../component/Login";
import Join from "../component/Join";
import Posts from "../component/Posts";

const AppRouter = () => {
    return (
    <Router>
        <div className="body">
        <Header />

        <Routes>

            <Route path="/" element={ <MainPage /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/join" element={ <Join /> } />

            {/* 동적 경로 처리 */}
            <Route path="/board/:community" element={<a />} />
            <Route path="/board/notice" element={<b />} />

        </Routes>

        <Footer />
        </div>
    </Router>
    );
}

export default AppRouter;