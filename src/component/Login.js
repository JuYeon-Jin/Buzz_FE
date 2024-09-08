const Login = () => {


    return (
        <main>
        <div className="center-container">
            <div className="center-container-title">로그인</div>
            <div className="center-container-input">
                <div className="input-wrapper">
                    <img src="img/user.png" className="img-login" alt=""/>
                    <input type="text" placeholder="아이디" maxLength="15"/>
                </div>
                <div className="input-wrapper">
                    <img src="img/lock.png" className="img-login" alt=""/>
                    <input type="password" placeholder="비밀번호" maxLength="15"/>
                </div>
            </div>
            <div className="center-container-alert">
                <span>아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
            </div>
            <div className="center-container-alert">
                <span>비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.</span>
            </div>
            <div className="center-container-button">
                <button className="login-button">로그인</button>
                <button className="login-button">회원가입</button>
            </div>
        </div>
        </main>
    );
}

export default Login;
