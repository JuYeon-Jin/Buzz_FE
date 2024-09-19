import UserNav from "./UserNav";
import {Link} from "react-router-dom";

const Header = () => {

    return (
        <header>

            <UserNav />

            <div className="logo">
                <Link to="/"><img src="img/logo.png" className="img-logo" alt=""/></Link>
            </div>

            <div className="menu-nav">
                <div className="menu-items">
                    <ul>
                        <li><Link to="/board/notice">공지사항</Link></li>
                        <li><Link to="/board/community">자유게시판</Link></li>
                        <li><Link to="/board/gallery">갤러리</Link></li>
                        <li><Link to="/board/support">문의게시판</Link></li>
                    </ul>
                </div>
            </div>

        </header>
    );
}

export default Header;