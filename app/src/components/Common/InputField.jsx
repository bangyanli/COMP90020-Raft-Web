import * as React from 'react';

function InputField(props) {
    const { label, name, valueState, setValueState = () => {}, style = {}, textarea = false} = props;

    const handleChange = (e) => {
        setValueState(e.target.value);
    }

    return(
        <div>
            <label>
                {label + ": "}
            </label>
            <br/>
            {!textarea 
                ? <input style={{...style, boxSizing: "border-box"}} type="text" name={name} value={valueState} onChange={handleChange} />
                : <textarea style={{...style, boxSizing: "border-box"}} name={name} value={valueState} onChange={handleChange}/>}
        </div>
    )


}

export default InputField;