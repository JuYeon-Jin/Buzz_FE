import PostPreview from "./PostPreview";
import '../layout/MainMiniPost.css';

const MainPage = () => {

    return (
        <main>
        <div className="main-container">

            <div className="main-item">
                <div className="main-item-title">공지사항</div>
                <PostPreview/>
                <a href="/" className="more-post">더보기</a>
            </div>

            <div className="main-item">
                <div className="main-item-title">자유게시판</div>
                <PostPreview/>
                <a href="/" className="more-post">더보기</a>
            </div>

            <div className="main-item">
                <div className="main-item-title">갤러리</div>
                <PostPreview/>
                <a href="/" className="more-post">더보기</a>
            </div>

            <div className="main-item">
                <div className="main-item-title">문의게시판</div>
                <PostPreview/>
                <a href="/" className="more-post">더보기</a>
            </div>
            
        </div>
        </main>
    );
}

export default MainPage;