import { setUserInfo, clearUserInfo } from '../features/userSlice';


/**
 *
 * @param token
 * @returns {*|null}
 */
export const decodeToken = (token) => {
    const base64UrlDecode = (str) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    try {
        const payload = token.split('.')[1]; // JWT의 페이로드 부분
        const decodedPayload = base64UrlDecode(payload);
        return decodedPayload.name; // name 추출
    } catch (error) {
        console.error('토큰 디코딩 중 오류:', error);
        return null;
    }
};


/**
 *
 * @param token
 * @param dispatch
 */
export const handleToken = (token, dispatch) => {
    const name = decodeToken(token);
    if (name) {
        localStorage.setItem('token', token); // 토큰을 로컬 스토리지에 저장
        dispatch(setUserInfo({ name })); // 중앙저장소에 name 저장
    } else {
        localStorage.removeItem('token'); // 토큰이 유효하지 않으면 제거
        dispatch(clearUserInfo()); // 중앙저장소 비우기
    }
};
