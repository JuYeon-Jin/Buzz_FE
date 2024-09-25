import CKEditorComponent from "../../common/CKEditorComponent";

const CommunityNew = () => {
    return (
        <main>
            <div className="center-container">

                <div>분류
                    <select>
                        <option>야호</option>
                    </select>
                </div>

                <div>
                    제목
                    <input placeholder="제목을 입력하세요."/>
                </div>
                <CKEditorComponent />

            </div>
        </main>
    );
};

export default CommunityNew;