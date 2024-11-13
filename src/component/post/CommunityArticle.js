import {useNavigate, useParams} from "react-router-dom";
import DOMPurify from "dompurify";
import React, {useEffect, useRef, useState} from "react";

const CommunityArticle = () => {

    const navigate = useNavigate();

    const { postId } = useParams();

    const [post, setPost] = useState({});
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState([]);

    const [newComment, setNewComment] = useState("");
    const commentInputRef = useRef(null);


    // TODO 게시물 본문 검색시, 태그가 검색되는 문제 발생.
    const contentSanitize = (content) => {
        return DOMPurify.sanitize(content);
    }

    const autoResizeTextarea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const fileDownload = async (fileId) => {
        // TODO 다운로드 할 때, 권한이 필요한 경우 fetch 로 변경 필요
        window.location.href = `http://localhost:8080/files/${fileId}`;
    }

    const submitComment = async () => {

        const content = newComment.trim();
        if (!content) {
            alert('댓글을 입력해주세요.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인한 유저만 댓글을 작성할 수 있습니다.');
            return;
        }

        const response = await fetch('http://localhost:8080/user/board/community/comment', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                postId: postId
            }),
        })

        const result = await response.json();

        if (response.ok) {
            setComment(result);
            commentInputRef.current.value = "";
        } else {
            alert(`댓글 작성 실패: ${result.message || '알 수 없는 오류'}`);
        }
    }

    const deleteComment = async (commentId) => {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8080/user/board/community/${postId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        const result = await response.json();

        if (response.ok) {
            setComment(result);
            commentInputRef.current.value = "";
        } else {
            alert(`댓글 작성 실패: ${result.message || '알 수 없는 오류'}`);
        }
    }


    const deletePost = async () => {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8080/user/board/community/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.ok) {
            navigate('/board/community', { replace: true });
        } else {
            alert("삭제 실패");
        }
    }


    // TODO 페이지 랜더링 완성되기 전에 멈춤 필요
    /**
     * 페이지가 최초 랜더링될 때, 서버에서
     */
    useEffect(() => {
        const fetchPostData = async () => {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8080/user/board/community/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            return await response.json();
        };

        fetchPostData().then(data => {
            const { postArticle, fileMetaList, comment } = data;
            setPost(postArticle);
            setFiles(fileMetaList);
            setComment(comment);
        });
    }, [postId]);

    return (
        <main>
            <div className="new-post-container">

                <div className="category-select-container">
                    <span>자유게시판</span>
                </div>

                <div className="community-title-container">
                    <span className="category-title">{post.categoryName}</span>
                    <span className="divider">｜</span>
                    <span className="community-post-title">{post.title}</span>
                </div>

                <div className="community-etc-outer-container">
                    <div className="community-etc-container">
                        <img src="/img/unknown.png" className="post-profile-img" alt=""/>
                        <div>
                            <div className="community-post-profile">
                                {post.name}
                            </div>
                            <div className="community-post-info">
                                <span>{post.createdAt}</span>
                                <span>조회 {post.views}</span>
                                <span>댓글 0</span>
                            </div>
                        </div>
                    </div>
                    {post.owner && (
                        <div className="post-control-btn">
                            <button>수정</button>
                            <button onClick={deletePost}>삭제</button>
                        </div>
                    )}
                </div>

                <div className="community-content-container"
                     dangerouslySetInnerHTML={{__html: contentSanitize(post.content)}}
                ></div>

                <div className="community-files-container">
                    {files.map((f, index) => {
                        const fileSizeInKB = (f.fileSize / 1024).toFixed(1);
                        return (
                            <div className="each-selected-files" key={index}>
                                <img src="/img/open-file.png" className="file-img" alt=""/>
                                <span className="file-name">{f.fileName}</span>
                                <span className="file-size">{fileSizeInKB} KB</span>
                                <button onClick={() => fileDownload(`${f.fileId}`)}>
                                    <img src="/img/download.png" className="download-img" alt=""/>
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="comment-container">
                    <div className="comment-input-container">
                        <textarea id="auto-resize-textarea" className="new-comment"
                                  placeholder="댓글을 남겨보세요" maxLength="500"
                                  onInput={autoResizeTextarea} onChange={handleCommentChange}
                                  ref={commentInputRef}><
                        /textarea>
                        <button className="new-comment-btn" onClick={submitComment}>등록</button>
                    </div>

                    <div className="comment-feed">

                        {comment.length > 0 ? (
                            comment.map((c) => (
                                <div className="comment-item" key={c.commentId}>
                                    <img src="/img/unknown.png" className="comment-user-img" alt=""/>
                                    <div className="comment-info">
                                        <div className="comment-user">{c.name}</div>
                                        <div className="comment-content">{c.content}</div>
                                        <div className="comment-date">{c.createdAt}</div>
                                    </div>

                                    {c.owner && (
                                        <button className="comment-delete-btn"
                                                onClick={() => deleteComment(c.commentId)}>삭제</button>
                                    )}
                                </div>
                            ))) : (
                            <div className="empty-comment">작성된 댓글이 없습니다.</div>
                        )}
                    </div>
                </div>

                <div>
                    목록 버튼 / 위로 올라가기 버튼
                </div>

            </div>
        </main>
    );
};

export default CommunityArticle;