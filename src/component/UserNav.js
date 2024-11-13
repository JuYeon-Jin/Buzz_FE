import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearUserInfo} from "../features/userSlice";
import {handleToken} from "../common/TokenUtils";

const UserNav = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const name = useSelector((state) => state.user.name);


    /**
     * 토큰의 유효성을 검증해 토큰을 갱신하거나, 삭제하는 함수
     *
     * 1. 로컬 스토리지에서 토큰을 가져온다.
     * 2. 서버에 요청해 유효성을 검증하고 만료시간이 얼마남지 않은 토큰은 갱신한다.
     *
     * @async
     * @returns {Promise<boolean>} 토큰이 유효한지 여부
     */
    const validateToken = async () => {

        // 로컬 스토리지에서 토큰을 가져온다.
        const token = localStorage.getItem('token');

        // 서버에 요청을 보낸다.
        if (token) {
            try {
                const response = await fetch('http://localhost:8080/validate-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                console.log(result);

                if (response.status === 401) {
                    return false;

                } else {
                    const newToken = response.headers.get('Authorization');
                    if (newToken && newToken.startsWith('Bearer ')) {
                        localStorage.setItem('token', newToken.split(' ')[1]);
                    }

                    return true;
                }

            } catch (error) {
                console.error('토큰 검증 중 오류 발생:', error);
                return false;
            }
        } else {
            console.log('토큰이 없어서 요청을 보내지 않습니다.');
            return false;
        }
    }


    /**
     * 컴포넌트가 마운트될 때 토큰을 검증하고, 유효하면 사용자 정보를 업데이트합니다.
     * 유효하지 않으면 토큰을 삭제하고 사용자 정보를 초기화합니다.
     */
    useEffect(() => {
        validateToken().then(valid => {
            // 로컬 스토리지에 있는 토큰을 서버에 요청한 결과, 유효할 때 (true)
            if (valid) {
                handleToken(dispatch);
            } else {
            // 토큰이 유효하지 않을 때 (false)
                localStorage.removeItem('token');
                dispatch(clearUserInfo());
            }
        });
    }, [dispatch]);


    /**
     * Localstorage 에서 토큰을 삭제하고, Redux Store 에서 사용자 정보를 초기화합니다.
     * 그 이후에 메인페이지로 이동합니다.
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearUserInfo());
        navigate("/");
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
