import {useParams} from "react-router-dom";

const CommunityArticle = () => {

    const { postId } = useParams();

    return (
        <main>
            <div className="center-container">

                <h1>{postId} 게시물</h1>

            </div>
        </main>
    );
};

export default CommunityArticle;