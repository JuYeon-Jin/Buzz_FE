import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../features/userSlice';
import { validateToken } from '../common/TokenValidation';
import { Link } from "react-router-dom";
import {handleToken} from "../common/TokenUtils";

const Header = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const name = useSelector((state) => state.user.name);


    /**
     * 컴포넌트가 마운트될 때 동작한다.
     */
    useEffect(() => {

        const checkToken = async () => {
            const isValid = await validateToken();
            return isValid;
        };

        checkToken().then(isValid => {
            if (isValid) {
                const token = localStorage.getItem('token');
                handleToken(token, dispatch);
            } else {
                localStorage.removeItem('token');
                dispatch(clearUserInfo());
            }
        });
    }, [dispatch]);


    /**
     *
     */
    const handleLogout = () => {
        alert("로그아웃");
        localStorage.removeItem('token');
        dispatch(clearUserInfo());
    };






    return (
        <header>

            {isAuthenticated ? (
                <div className="user-nav">
                    <span className="user-link-text"><span className="user-name-text">{name}</span> 님 안녕하세요 !</span>
                    <span className="user-link-text" onClick={handleLogout}>로그아웃</span>
                </div>
            ) : (
                <div className="user-nav">
                    <Link to="/login" className="user-link-text">로그인</Link>
                    <Link to="/join" className="user-link-text">회원가입</Link>
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