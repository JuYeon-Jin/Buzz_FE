import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {validateToken} from "../common/TokenValidation";
import {handleToken} from "../common/TokenUtils";
import {clearUserInfo} from "../features/userSlice";

const UserNav = () => {

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
        <>
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
        </>
    );
};

export default UserNav;
