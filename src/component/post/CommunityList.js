import {Link, useOutletContext} from "react-router-dom";
import {useState} from "react";

const CommunityList = ({boardType}) => {

    const { test } = useOutletContext();

    return (
        <>
            <div className="board-type">
                {boardType}
            </div>
            <div className="post-list">
                <ul className="">
                    <li className="list-title">
                        <span className="width6">번호</span>
                        <span className="width6">분류</span>
                        <span className=""></span>
                        <span className="width56">제목</span>
                        <span className="width6">조회</span>
                        <span className="width16">작성일</span>
                        <span className="width9">작성자</span>
                    </li>
                    <li className="list-item">
                        <span className="width6">10</span>
                        <span className="width6">{test}</span>
                        <span className="width3"></span>
                        <div className="post-list-title">
                            <Link to={`/board/community/1`} className="text-wrap">어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구</Link>
                            <span className="new-post">new</span>
                        </div>
                        <span className="width6">2</span>
                        <span className="width16">2024.05.10 12:00</span>
                        <span className="width9">홍길동최고</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default CommunityList;