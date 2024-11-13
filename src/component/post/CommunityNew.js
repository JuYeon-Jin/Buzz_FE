import React, {useEffect, useState, useRef} from "react";
import CKEditorComponent from "../../common/CKEditorComponent";
import {useNavigate} from "react-router-dom";
import {clearUserInfo} from "../../features/userSlice";
import {useDispatch} from "react-redux";

const CommunityNew = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);

    const fileInputRef = useRef(null);


    /**
     * 카테고리 선택이 변경될 때 호출됩니다.
     *
     * @param {Event} event - select 요소의 change 이벤트
     */
    const handleCategoryChange = (event) => {
        setCategoryId(Number(event.target.value));
    }


    /**
     * 제목이 변경될 때 호출됩니다.
     *
     * @param {Event} event - input 요소의 change 이벤트
     */
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }


    /**
     * 파일 선택 시 호출됩니다.
     * 파일 갯수, 파일 크기, 파일 이름 중복 및 확장자 제한을 검사하고,
     * 조건을 충족한 파일 데이터를 selectedFiles[] 에 추가합니다.
     *
     * @param {Event} event - input 요소의 change 이벤트
     */
    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {

            // 파일 갯수가 5개 이상인 경우 업로드 제한
            if (selectedFiles.length >= 5) {
                alert("파일은 최대 5개까지 업로드할 수 있습니다.");
                fileInputRef.current.value = ""; // 파일 input 초기화
                return;
            }

            // 파일 크기가 2MB 초과인 경우 업로드 제한
            const maxSize = 2 * 1024 * 1024; // 2MB
            if (newFile.size > maxSize) {
                alert("파일 크기는 최대 2MB 까지 가능합니다.");
                fileInputRef.current.value = "";
                return;
            }

            // 파일 이름이 중복되는 경우 업로드 제한
            const isDuplicate = selectedFiles.some((file) => file.name === newFile.name);
            if (isDuplicate) {
                alert("같은 이름의 파일이 이미 선택되어 있습니다.");
                fileInputRef.current.value = "";
                return;
            }

            // 파일 확장자 제한
            const allowedExtensions = ["jpg", "gif", "png", "zip"]; // 허용할 확장자 목록
            const fileExtension = newFile.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                alert("허용되지 않는 파일 형식입니다. jpg, gif, png, zip 파일만 업로드할 수 있습니다.");
                fileInputRef.current.value = "";
                return;
            }

            setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            fileInputRef.current.value = "";
        }
    }


    /**
     * 파일을 목록에서 제거합니다.
     *
     * @param {number} index - 제거할 파일의 인덱스
     */
    const removeFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };


    /**
     * 작성된 게시물과 선택된 파일을 서버로 전송합니다.
     * 본문 데이터는 "post" 필드로 JSON 형식으로 직렬화하여 전송합니다.
     */
    const handleSubmit = async () => {

        if (categoryId === 0) {
            alert("카테고리를 선택해 주세요.");
            return false;
        }
        if (title.trim() === "") {
            alert("제목을 입력해 주세요.");
            return false;
        }
        if (content.trim() === "") {
            alert("내용을 입력해 주세요.");
            return false;
        }
        if (content.length > 50000) {
            alert(`내용이 입력할 수 있는 길이를 초과하였습니다.`);
            return false;
        }

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('post', new Blob([JSON.stringify({
            categoryId: categoryId,
            title: title,
            content: content
        })], { type: "application/json" }));

        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        const response = await fetch("http://localhost:8080/user/board/community", {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (response.ok) {
            const newToken = response.headers.get('Authorization');
            console.log("성공적 : " + newToken)
            if (newToken && newToken.startsWith('Bearer ')) {
                localStorage.setItem('token', newToken.split(' ')[1]);
            }
            navigate('/board/community', { replace: true });

        } else if (response.status === 401) {
            localStorage.removeItem('token');
            dispatch(clearUserInfo());
            navigate('/login', { replace: true });

        } else if (response.status === 400) {
            console.error("게시물 에러 : " + JSON.stringify(result));
            alert(result.message);

        } else {
            console.error("게시물 저장 중 오류 발생:", response.statusText);
        }
    }


    /**
     * 페이지가 최초 랜더링될 때, 서버에서 카테고리 목록을 가져옵니다.
     */
    useEffect(() => {
        // TODO 새글쓰기 - 로그인한 회원만 글을 쓸수 있게 바꾸기
        // TODO 새글쓰기 - CK Editor 글 내부에 이미지 등 특수 상황 관련하여 보완 필요
        // TODO 새글쓰기 - 본문 내용과, 파일 예외처리가 어지러우니 정리 필요
        // TODO 새글쓰기 - 글자 제한을 눈으로 확인할 수 있도록 제목과 본문에 작성된 글자와 제한글자를 보여주기
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:8080/user/board/community/category', { method: 'GET' });
            return await response.json();
        };

        fetchCategories().then(data => setCategory(data));
    }, []);


    return (
        <main>
            <div className="new-post-container">
                <div className="category-select-container">
                    <span>자유게시판</span> ｜
                    <select className="category-select" onChange={handleCategoryChange}>
                        <option>카테고리를 선택해 주세요.</option>
                        {category.map((c) => (
                            <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
                        ))}
                    </select>
                </div>

                <div className="post-title-container">
                    <input placeholder="제목을 입력해 주세요." maxLength={60}
                           onChange={handleTitleChange}/>
                </div>

                <CKEditorComponent onChange={setContent}/>

                <div className="file-container">
                    <div className="selected-files">
                        {selectedFiles.map((file, index) => (
                            <div className="each-selected-files" key={index}>
                                <img src="/img/add-file.png" className="file-img" alt=""/>
                                <span className="file-name">{file.name}</span>
                                <button onClick={() => removeFile(index)}>✖</button>
                            </div>
                        ))}
                    </div>

                    <div className="file-instruction">※ jpg, gif, png, zip 파일만 가능하며, 파일의 크기는 최대 2MB 까지 업로드 가능합니다.</div>

                    <div className="select-file">
                        <input type="file" name="files" ref={fileInputRef}
                               onChange={handleFileChange}/>
                    </div>
                </div>

                <div className="new-post-button">
                    <button className="post-submit-button" onClick={handleSubmit}>저장</button>
                    <button className="post-cancel-button">취소</button>
                </div>

            </div>
        </main>
    );
};

export default CommunityNew;