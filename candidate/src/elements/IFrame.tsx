import React from 'react';
import { createPortal } from "react-dom";

import "../styles/elements/IFrame.css"
const css = "body {background-color: #000000; color: #ffffff; font-family: consolas, monospace; } pre { font-size: 100%; font-family: consolas, monospace; white-space: pre-wrap;} span{word-break: break-word;}"
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));

const IFrame: React.FC = ({ children, ...props }) => {
    const [contentRef, setContentRef] = React.useState<HTMLIFrameElement>(null)
    const mountNode = contentRef?.contentWindow?.document?.body
    contentRef?.contentWindow?.document?.head.appendChild(style)

    return (
        <iframe {...props} ref={setContentRef} id="output" title="console">
            {mountNode && createPortal(children, mountNode)}
        </iframe>
    )
}
export default IFrame