import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Context, Bold, Essentials, Italic, Paragraph, ContextWatchdog } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

function CKEditorComponent() {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                plugins: [Essentials, Bold, Italic, Paragraph],
                toolbar: ['undo', 'redo', '|', 'bold', 'italic'],
            }}
            data='<p>Hello from CKEditor!</p>'
            onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
            }}
        />
    );
}

export default CKEditorComponent;
