import PostPreview from "./PostPreview";
import '../layout/MainMiniPost.css';
import {Link} from "react-router-dom";

const MainPage = () => {

    return (
        <main>
        <div className="main-container">

            <div className="main-item">
                <div className="main-item-title">공지사항</div>
                <PostPreview/>
                <Link to="/board/notice" className="more-post">더보기</Link>
            </div>

            <div className="main-item">
                <div className="main-item-title">자유게시판</div>
                <PostPreview/>
                <Link to="/board/community" className="more-post">더보기</Link>
            </div>

            <div className="main-item">
                <div className="main-item-title">갤러리</div>
                <PostPreview/>
                <Link to="/board/gallery" className="more-post">더보기</Link>
            </div>

            <div className="main-item">
                <div className="main-item-title">문의게시판</div>
                <PostPreview/>
                <Link to="/board/support" className="more-post">더보기</Link>
            </div>
            
        </div>
        </main>
    );
}

export default MainPage;