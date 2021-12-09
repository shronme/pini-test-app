import React from "react";

function Input(props) {
    const changeHandler = props.onChange;
    return (
        <input onChange={changeHandler} type="text" />
    );
}

export default Input;