import React, { useEffect } from 'react';
import { CKEditor } from 'ckeditor4-react';

export default function QuestionEditor(props: any) {

    const [data, setData] = React.useState<any>();

    useEffect(() => {
        console.log(data?.response)
    }, [data])


    const [img, setImg] = React.useState<any>();



    /*function getImag() {
        fetch('http://localhost:8000/img')
            .then(res => res.text())
            .then(res => {
                setImg(res)
                if (spanRef.current) {
                    spanRef.current.innerHTML = res
                }
            })
            .catch(err => window.prompt(err))
    }*/
    const spanRef = React.useRef<HTMLSpanElement>(null);

    const str1 = `<button onclick="window.alert('Hacckeed')">varchar</button>`
    const exp = `<a href="javascript:document.writeln('on' + 'click' + ' and more malicious stuff here...');">example</a>`
    //const str = str1.replace(/ *\=[^=]*\" */g, "");
    const str = str1.replace(/\s* on.*\"/g, "");
    let st = exp.replace(/\s* on.*\"/g, "");
    st = st.replace(/ *\=[^=]*\" */g, "");

    const string = `<script  href="">hello</script> 
    <a src="http://badsite.com/javascriptfile" />
    <img src="nonexistent.png" onerror="alert('This restaurant got voted worst in town!');" />`;
    const tag = string.replaceAll('[src|href]|src', '').replace(/\s* on.*\"/g, "");


    if (spanRef.current) {
        spanRef.current.innerHTML = tag
    }

    return (
        <>
            <CKEditor
                //onChange={(event: any) => { if (props) props.sendData(event); }}
                onDestroy={() => console.log("destor")}
                //onFileUploadRequest={(e) => { setData(e.data?.fileLoader) }}
                onFileUploadResponse={(e) => { setData(e.data) }}
                initData={props.data}
                config={{
                    toolbar: [
                        ['Source'],
                        ['Styles', 'Format', 'Font', 'FontSize'],
                        ['Bold', 'Italic'],
                        ['Undo', 'Redo'],
                        ['EasyImageUpload', 'Table']
                    ],

                    extraPlugins: 'easyimage',
                    removePlugins: 'image',
                    cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
                    cloudServices_tokenUrl: 'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
                }}
                type='classic' />
            <span ref={spanRef} />

            <button >img</button></>
    )

}

// toolbar: [
        //     ['Source'],
        //     ['Styles', 'Format', 'Font', 'FontSize'],
        //     ['Bold', 'Italic'],
        //     ['Undo', 'Redo'],
        //     ['EasyImageUpload', 'Table']
        // ]