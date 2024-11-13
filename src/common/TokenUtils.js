import { setUserInfo } from '../features/userSlice';


/**
 * JWT 토큰을 디코딩하고 사용자 닉네임을 Redux 스토어에 저장하는 함수.
 *
 * @param {function} dispatch - Redux 의 dispatch 함수
 */
export const handleToken = (dispatch) => {
    const name = decodeToken(localStorage.getItem('token'));
    dispatch(setUserInfo({ name }));
};


/**
 * JWT 토큰을 디코딩하여 페이로드에서 사용자 이름을 추출하는 함수.
 *
 * 1. Base64Url 인코딩을 일반 Base64 인코딩으로 변환.
 * 2. Base64 인코딩된 문자열을 디코딩.
 *
 * @param {string} token - 디코딩할 JWT 토큰
 * @returns {string|null} 디코딩된 사용자 이름. 오류 발생 시 null을 반환.
 */
const decodeToken = (token) => {
    try {
        const payload = token.split('.')[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));

        return decoded.name;

    } catch (error) {
        console.error('토큰 디코딩 중 오류:', error);
        return null;
    }
};