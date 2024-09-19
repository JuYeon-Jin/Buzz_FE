import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {handleToken} from "../common/TokenUtils";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    const loginRequest = async () => {
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.ok) { // 응답이 성공적이면
            const data = await response.text();
            handleToken(data, dispatch);
            navigate("/"); // 성공 시 홈으로 이동
        }
    }


    return (
        <main>
        <div className="center-container">
            <div className="center-container-title">로그인</div>
            <div className="center-container-input">

                <div className="input-wrapper">
                    <img src="img/user.png" className="img-login" alt=""/>
                    <input type="text" placeholder="아이디" maxLength="15" onChange={handleUsernameChange}/>
                </div>

                <div className="input-wrapper">
                    <img src="img/lock.png" className="img-login" alt=""/>
                    <input type="password" placeholder="비밀번호" maxLength="15" onChange={handlePasswordChange}/>
                </div>

            </div>


            <div className="center-container-button">
                <button className="login-button" onClick={loginRequest}>로그인</button>
                <button className="login-button">
                    <Link to="/join">
                        회원가입
                    </Link>
                </button>
            </div>
        </div>
        </main>
    );
}

export default Login;
