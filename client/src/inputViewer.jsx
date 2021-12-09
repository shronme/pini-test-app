import React, {useState} from "react";
import Input from "./Input.jsx";

function InputViewer() {
    const [text, setText] = useState('');
    function changeHandler(e) {
        setText(e.target.value);
    }
    return (
        <div>
            <Input onChange={changeHandler} type='text' />
            <p>{text}</p>
        </div>
    );
}

export default InputViewer;