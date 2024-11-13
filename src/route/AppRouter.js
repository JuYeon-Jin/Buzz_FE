import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../layout/Common.css';
import '../layout/Login.css';
import '../layout/Post.css';
import '../layout/Community.css'

import MainPage from "../component/MainPage";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Login from "../component/Login";
import Join from "../component/Join";
import Posts from "../component/Posts";

import CommunityList from "../component/post/CommunityList";
import CommunityArticle from "../component/post/CommunityArticle";
import CommunityNew from "../component/post/CommunityNew";
import GalleryList from "../component/post/GalleryList";
import NoticeList from "../component/post/NoticeList";
import SupportList from "../component/post/SupportList";

const AppRouter = () => {
    return (
    <Router>
        <div className="body">
        <Header />

        <Routes>

            <Route path="/" element={ <MainPage /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/join" element={ <Join /> } />

            <Route path="/board/" element={<Posts/>}>
                <Route path="community" element={<CommunityList boardType="자유게시판"/>} />
                <Route path="gallery" element={<GalleryList boardType="갤러리" />} />
                <Route path="notice" element={<NoticeList boardType="공지사항" />} />
                <Route path="support" element={<SupportList boardType="문의게시판" />} />
            </Route>

            <Route path="/board/community/:postId" element={ <CommunityArticle /> } />
            <Route path="/board/community/new" element={ <CommunityNew /> } />

        </Routes>

        <Footer />
        </div>
    </Router>
    );
}

export default AppRouter;