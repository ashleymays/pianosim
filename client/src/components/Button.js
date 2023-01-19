/*
    FILE: Button.js
    PURPOSE: Style all buttons displayed in the virtual keyboard.
*/

function Button(props) {
    return (
        <label onChange={props.onChange} onClick={props.onClick} className="flex flex-column btn-container">
            <input type={props.type} name="button" />
            <span className="flex flex-column">
                <div className={props.className} />
                <h4 className="flex label">{props.children}</h4>
            </span>
        </label>
    )
}

export default Button;