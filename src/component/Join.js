const Join = () => {


    return (
        <main>
            <div className="center-container">
                <div className="center-container-title">회원가입</div>
                <div className="center-container-input">
                    <div className="input-wrapper">
                        <img src="img/user.png" className="img-login" alt=""/>
                        <input type="text" placeholder="아이디" maxLength="15"/>
                    </div>
                    <div className="input-wrapper">
                        <img src="img/lock.png" className="img-login" alt=""/>
                        <input type="password" placeholder="비밀번호" maxLength="15"/>
                        <img src="img/hidden.png" className="img-hidden" alt=""/>
                    </div>
                    <div className="input-wrapper">
                        <img src="img/lock.png" className="img-login" alt=""/>
                        <input type="password" placeholder="비밀번호 확인" maxLength="15"/>
                        <img src="img/hidden.png" className="img-hidden" alt=""/>
                    </div>
                    <div className="input-wrapper">
                        <img src="img/input.png" className="img-login" alt=""/>
                        <input type="text" placeholder="이름" maxLength="8"/>
                    </div>
                </div>
                <div className="center-container-alert">
                    <span>아이디: 4~12자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
                </div>
                <div className="center-container-alert">
                <span>비밀번호: 4~12자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.</span>
                </div>
                <div className="center-container-alert">
                    <span>비밀번호 확인: 비밀번호가 일치하지 않습니다.</span>
                </div>
                <div className="center-container-alert">
                    <span>이름: 2~5자의 영문 대/소문자, 숫자, 특수문자, 한글을 사용해주세요.</span>
                </div>
                <div className="center-container-button">
                    <button className="join-button">회원가입</button>
                </div>
            </div>
        </main>
    );
}

export default Join;
