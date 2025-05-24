import React from 'react'

function Input() {
    return (
        <div className="inputGroup">
            <input type="text" required="" autocomplete="off" />
                <label for="name">Name</label>
        </div>
    )
}

export default Input