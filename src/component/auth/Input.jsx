import { useId , forwardRef } from "react"

function Input({label , required , type , ...props},ref) {

    const id = useId()

    return (
        <div className="inputGroup">
            <input id={id} type={type} ref={ref} required={required}  {...props} />
            <label >{label}</label>
        </div>
    )
}

export default forwardRef(Input)