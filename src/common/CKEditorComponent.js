import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({onChange }) => {
    return (
        <div className="remake-editor">
            <CKEditor
                editor={ClassicEditor}
                config={{
                    placeholder: '내용을 입력하세요',
                    ckfinder: {
                        uploadUrl: "http://localhost:8080/user/community/ck-edit/upload"
                    }
                }}
                onChange={(event, editor) => {
                    // getData() 메서드는 에디터의 현재 내용을 HTML 문자열로 반환(텍스트, 이미지)
                    const data = editor.getData();
                    // onChange prop을 호출하여 에디터 내용을 상위 컴포넌트(CommunityNew)에 전달
                    onChange(data); // → 즉, setContent(data) 가 되는 것.
                }}

            />
        </div>
    );
}

export default CKEditorComponent;
