import {useState} from "react";
import {useDispatch} from "react-redux";
import {handleToken} from "../common/TokenUtils";

const Join = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handlePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const joinRequest = async () => {
        const response = await fetch('http://localhost:8080/user/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                name: name
            })
        });

        const data = await response.text();
        handleToken(data, dispatch);
    }



    return (
        <main>
            <div className="center-container">
                <div className="center-container-title">회원가입</div>
                <div className="center-container-input">

                    <div className="input-wrapper">
                        <img src="img/user.png" className="img-login" alt=""/>
                        <input type="text" placeholder="아이디" maxLength="15" onChange={handleUsernameChange}/>
                    </div>

                    <div className="input-wrapper">
                        <img src="img/lock.png" className="img-login" alt=""/>
                        <input type="password" placeholder="비밀번호" maxLength="15" onChange={handlePasswordChange}/>
                        <img src="img/hidden.png" className="img-hidden" alt=""/>
                    </div>

                    <div className="input-wrapper">
                        <img src="img/lock.png" className="img-login" alt=""/>
                        <input type="password" placeholder="비밀번호 확인" maxLength="15" onChange={handlePasswordConfirm}/>
                        <img src="img/hidden.png" className="img-hidden" alt=""/>
                    </div>

                    <div className="input-wrapper">
                        <img src="img/input.png" className="img-login" alt=""/>
                        <input type="text" placeholder="이름" maxLength="8" onChange={handleNameChange}/>
                    </div>

                </div>

                {/* TODO 랜더링시에 TRUE 인 경우 / FALSE 인 경우 (display : none) */}
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
                    <button className="join-button" onClick={joinRequest}>회원가입</button>
                </div>

            </div>
        </main>
    );
}

export default Join;
