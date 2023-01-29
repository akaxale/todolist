import React from 'react';

export default function Input(props) {
    function handleSubmit(e) {
        e.preventDefault()
        props.add()
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                className='task-input'
                type='text'
                name='task'
                placeholder='new task'
                value={props.task}
                onChange={props.handleChange}
            />
            <button className='add-task-btn'>+</button>
        </form>
    )
}