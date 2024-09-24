const Footer = () => {
    return (

        <footer>


            <div className="bottom-box">
                <div className="row-area">
                    <div className="row-area-item">
                        <span className="bold13">Developer</span>
                        <ul>
                            <li>진주연 (Full Stack Developer)</li>
                        </ul>
                    </div>
                    <div className="row-area-item">
                        <span className="bold13">GitHub</span>
                        <ul>
                            <li>GitHub Profile</li>
                        </ul>
                    </div>
                    <div className="row-area-item">
                        <span className="bold13">Contact</span>
                        <ul>
                            <li>your-email@example.com</li>
                        </ul>
                    </div>
                </div>

                <div className="col-area">
                    {/* TODO 외부 프로젝트와 연결 필요 (a 태그도 그때 같이 수정하기) */}
                    <div className="col-area-item">
                        <div className="bold13">프로젝트 빙고</div>
                        <div className="ac_link"><a href="/">바로가기</a></div>
                    </div>
                    <a href="/"><img src="/img/bingo.png" className="col-area-img" alt=""/></a>
                </div>

                <div className="col-area">
                    <div className="col-area-item">
                        <div className="bold13">프로젝트</div>
                        <div className="ac_link"><a href="/">바로가기</a></div>
                    </div>
                    <a href="/"><img src="/img/bingo.png" className="col-area-img" alt=""/></a>
                </div>
            </div>

            <div className="copy-right">
                <span>&copy; 2024 진주연. All rights reserved. 🩷을 담아 만들었습니다.</span>
            </div>

        </footer>

    );
}

export default Footer;