const Header = () => {

    const userId = false;

    return (
        <header>

            {userId ? (
                <div className="user-nav">
                    <span className="user-link-text"><a href="/" className="user-name-text">홍길동</a> 님 안녕하세요 !</span>
                    <a href="/" className="user-link-text">로그아웃</a>
                </div>
            ) : (
                <div className="user-nav">
                    <a href="/" className="user-link-text">로그인</a>
                    <a href="/" className="user-link-text">회원가입</a>
                </div>
            )}

            <div className="logo">
                <a href="/"><img src="img/logo.png" className="img-logo" alt=""/></a>
            </div>

            <div className="menu-nav">
                <div className="menu-items">
                    <ul>
                        <li><a href="/">공지사항</a></li>
                        <li><a href="/">자유게시판</a></li>
                        <li><a href="/">갤러리</a></li>
                        <li><a href="/">문의게시판</a></li>
                    </ul>
                </div>
            </div>

        </header>
    );
}

export default Header;