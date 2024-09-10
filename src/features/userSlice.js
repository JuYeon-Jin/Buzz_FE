import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,  // 로그인 상태 여부
    name: null,              // JWT 토큰 내부의 name 정보
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.isAuthenticated = true;   // 토큰이 유효하면 로그인 상태로 설정
            state.name = action.payload.name;  // JWT 내부의 name을 상태에 저장
        },
        clearUserInfo: (state) => {
            state.isAuthenticated = false;  // 로그아웃 시 로그인 상태 해제
            state.name = null;              // name 정보 초기화
        },
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
