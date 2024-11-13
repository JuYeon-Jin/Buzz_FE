import {Link, useOutletContext} from "react-router-dom";

const CommunityList = ({boardType}) => {

    const { postList, postNumber } = useOutletContext();

    /**
     * 주어진 작성일이 현재 시각으로부터 24시간 이내인지 확인합니다.
     *
     * @param {string} createdAt - 게시물의 작성일을 나타내는 날짜 문자열
     * @returns {boolean} 작성일이 현재 시각으로부터 24시간 이내인 경우 true, 그렇지 않은 경우 false
     */
    const isNewPost = (createdAt) => {
        // 문자열 date 객체로 변환
        const postDate = new Date(createdAt);
        // 현재 날짜와 시간
        const now = new Date();
        // 두 Date 객체를 빼면 두 날짜 간의 차이가 밀리초(ms)로 반환 → 시간단위로 변환
        const hoursDiff = (now - postDate) / (1000 * 60 * 60);
        // 24시간 이내라면 (true/false)
        return hoursDiff <= 24;
    };

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
                        <span className="width56">제목</span>
                        <span className="width6">조회</span>
                        <span className="width16">작성일</span>
                        <span className="width9">작성자</span>
                    </li>


                    {postList.length > 0 ? (postList.map((post, index) => (
                        post.isDeleted ? (
                            // TODO 삭제된 게시물로 가는 별도의 주소(와 뷰페이지) 필요
                            <li className="list-item" key={post.postId}>삭제된 게시물입니다.</li>


                        ) : (
                            <li className="list-item" key={post.postId}>
                                <span className="width6">{postNumber - index}</span>
                                <span className="width6">{post.categoryName}</span>
                                <span className="width3">
                                    {post.fileExist && (
                                        <img src="../img/clip.png" className="file-exist-img" alt=""/>
                                    )}
                                </span>
                                <div className="post-list-title">
                                <Link to={`/board/community/${post.postId}`} className="text-wrap">{post.title}</Link>
                                    {post.commentCount > 0 && (
                                        <span className="comment-count">({post.commentCount})</span>
                                    )}
                                    {isNewPost(post.createdAt) && (
                                        <span className="new-post">new</span>
                                    )}
                                </div>
                                <span className="width6">{post.views}</span>
                                <span className="width16">{post.createdAt}</span>
                                <span className="width9">{post.name}</span>
                            </li>
                        )))) : (
                        <div className="emptyList">게시물이 존재하지 않습니다.</div>
                    )}


                </ul>
            </div>
        </>
    );
};

export default CommunityList;