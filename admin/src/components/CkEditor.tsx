import { CKEditorEventAction, useCKEditor } from 'ckeditor4-react';
import React from 'react';


const toolbar = [
    { name: 'document', items: ['-', 'Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
    { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
    { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
    // { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
    { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
    '/',
    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
    { name: 'colors', items: ['TextColor', 'BGColor'] },
    { name: 'tools', items: ['Maximize', 'EasyImageUpload'] },
    // { name: 'about', items: ['About'] }
];

function Editor({ dispatchEvent, initData }) {
    // Use `useState` rather than `useRef` in order to trigger re-render.
    const [element, setElement] = React.useState<HTMLDivElement | null>(null);
    const config = {

        toolbar,
        extraPlugins: ['easyimage'],
        filebrowserUploadUrl: 'http://localhost:8000/easyimage/upload',
        // filebrowserImageUploadUrl: 'http://localhost:8000/easyimage/upload?type=Images',
        removePlugins: ['image'],
        filebrowserUploadMethod: "form",
        //cloudServices_uploadUrl: 'http://localhost:8000/easyimage/upload',
        //cloudServices_tokenUrl: 'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
        cloudServices_tokenUrl: 'http://localhost:8000/cs-token-endpoint'
    }

    const { status } = useCKEditor({
        element,
        config,
        dispatchEvent,
        subscribeTo: ['blur', 'change', 'focus', 'loaded', 'CLEAR_DATA',]
    });

    return (
        <div
            ref={setElement}
            style={status !== 'ready' ? { visibility: 'hidden' } : undefined}
        />

    );
}

export const CkEditor: React.FC<any> = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        clearData() {
            props.sendData(data)
            dispatch({ type: 'CLEAR_DATA', payload: editor })
        },
    }))
    const [{ editor, data, }, dispatch] = React.useReducer(reducer, {
        editor: undefined,
        data: undefined,
    });


    return (
        <div >
            <Editor
                dispatchEvent={dispatch}
                initData={<p>Let write !</p>}
            />
        </div>
    );
})


function reducer(state, action) {
    switch (action.type) {
        case 'CLEAR_DATA':
            action.payload.setData("");
            return { ...state, editor: action.payload }

        case CKEditorEventAction.change:
            const data = action.payload.editor.getData();
            return {
                state,
                editor: action.payload.editor,
                data,
            };
        case CKEditorEventAction.focus:
            // action.payload.editor.setData("")
            return {
                ...state,
                editor: action.payload.editor
            };

        case CKEditorEventAction.blur:
            return {
                ...state,
                editor: action.payload.editor
            };
        case CKEditorEventAction.loaded:
            //console.log(action.payload.editor)
            return {
                editor: action.payload.editor
            };

    }
}

