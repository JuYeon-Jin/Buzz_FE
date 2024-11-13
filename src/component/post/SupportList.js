import {useOutletContext} from "react-router-dom";

const SupportList = ({boardType}) => {

    const { postList } = useOutletContext();

    return (
        <>
            <div className="board-type">
                {boardType}
            </div>
            <div className="post-list">
                {postList.length > 0 ? (postList.map(post => ( <div>제목 : {post.title}</div> ))
                ) : (
                    <div className="emptyList font15">게시물이 존재하지 않습니다.</div>
                )}
            </div>
        </>
    );
};

export default SupportList;