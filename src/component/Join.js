import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {handleToken} from "../common/TokenUtils";
import {areValuesEqual, hasConsecutiveChars, validateInput, validateLength} from "../common/InputValidation";

const Join = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");

    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);


    /**
     * 아이디 입력
     *
     * @param event Blur
     */
    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (validateLength(value, 4, 12) && validateInput(value, "username")) {
            setUsernameValid(true);
        } else {
            setUsernameValid(false);
        }
    }

    /**
     * 비밀번호 입력
     *
     * @param event Blur
     */
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);

        if (validateLength(value, 4, 12) && validateInput(value, "password") && !hasConsecutiveChars(value)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }

    /**
     * 비밀번호 확인 입력
     *
     * @param event Blur
     */
    const handlePasswordConfirm = (event) => {
        const value = event.target.value;
        setPasswordConfirm(value);

        if (areValuesEqual(password, value)) {
            setPasswordConfirmValid(true);
        } else {
            setPasswordConfirmValid(false);
        }
    }

    /**
     * 닉네임 입력
     *
     * @param event Blur
     */
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);

        if (validateLength(value, 2, 5) && validateInput(value, "name")) {
            setNameValid(true);
        } else {
            setNameValid(false);
        }
    }

    /**
     * 아이디 중복 체크
     */
    const checkIdDuplicate = () => {
        serverPostRequest("/duplicate-id", {
            username: username
        }).then(response => response.json())
          .then(data => {
            if (!data) {
                // TODO 아이디 체크에 따른 JSX 분기처리 필요
            } else {
                alert("중복된 아이디");
            }
        });
    }

    /**
     * 회원가입 요청시 최종 점검 후 서버에 요청
     */
    const joinRequest = () => {
        if (usernameValid && passwordValid && passwordConfirm && nameValid) {
            serverPostRequest("/join", {
                username: username,
                password: password,
                name: name
            }).then(response => {
                const token = response.headers.get('Authorization');
                if (token && token.startsWith('Bearer ')) {
                    localStorage.setItem('token', token.split(' ')[1]);
                    handleToken(dispatch);
                    navigate("/");
                }
            });
        } else {
            alert("회원가입 양식 입력이 완료되지 않았습니다.");
        }
    }


    /**
     * 서버에 post 요청을 보내고 response 를 return 한다.
     */
    const serverPostRequest = async (path, body) => {
        const url = `http://localhost:8080/user${path}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        return response;
    }


    return (
        <main>
            <div className="center-container">
                <div className="center-container-title">회원가입</div>
                <div className="center-container-input">

                    <div className="input-wrapper">
                        <img src="img/user.png" className="img-login" alt=""/>
                        <input type="text" placeholder="아이디" maxLength="15" onBlur={handleUsernameChange}
                               className={`width100 ${username ? (usernameValid ? 'valid-true' : 'valid-false') : ''}`}/>
                        <button className="duplication-check-btn" onClick={checkIdDuplicate}>중복체크</button>
                    </div>

                    <div className="input-wrapper">
                        <img src="img/lock.png" className="img-login" alt=""/>
                        <input type="password" placeholder="비밀번호" maxLength="15" onBlur={handlePasswordChange}
                               className={`${password ? (passwordValid ? 'valid-true' : 'valid-false') : ''}`}/>
                        <img src="img/hidden.png" className="img-hidden" alt=""/>
                    </div>

                    <div className="input-wrapper">
                        <img src="img/lock.png" className="img-login" alt=""/>
                        <input type="password" placeholder="비밀번호 확인" maxLength="15" onBlur={handlePasswordConfirm}
                               className={`${passwordConfirm ? (passwordConfirmValid ? 'valid-true' : 'valid-false') : ''}`}/>
                        <img src="img/hidden.png" className="img-hidden" alt=""/>
                    </div>

                    <div className="input-wrapper">
                        <img src="img/input.png" className="img-login" alt=""/>
                        <input type="text" placeholder="이름" maxLength="8" onBlur={handleNameChange}
                               className={`${name ? (nameValid ? 'valid-true' : 'valid-false') : ''}`}/>
                    </div>

                </div>


                <div className={`center-container-alert ${username ? (usernameValid ? 'valid-hidden' : '') : 'valid-hidden'}`}>
                    <span>아이디: 4~12자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
                </div>
                <div className={`center-container-alert ${password ? (passwordValid ? 'valid-hidden' : '') : 'valid-hidden'}`}>
                <span>비밀번호: 4~12자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.</span>
                </div>
                <div className={`center-container-alert ${passwordConfirm ? (passwordConfirmValid ? 'valid-hidden' : '') : 'valid-hidden'}`}>
                    <span>비밀번호 확인: 비밀번호가 일치하지 않습니다.</span>
                </div>
                <div className={`center-container-alert ${name ? (nameValid ? 'valid-hidden' : '') : 'valid-hidden'}`}>
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
