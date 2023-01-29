import React from 'react';

export default function List(props) {
    return (
        <div className='list'>{
            props.list.map(toDoItem => {
                if (toDoItem.task.trim()) {
                    return (
                        <div 
                            key={toDoItem.id}
                            className='list-item'
                        >
                            <input 
                                type="checkbox" 
                                name="isCompleted"
                                id="isCompleted" 
                                className="checkbox"
                                checked={toDoItem.isCompleted}
                                onChange={props.handleChange}
                                onClick={() => props.handleCheckbox(toDoItem.id)}
                            />
                            <label 
                                htmlFor="isCompleted"
                                className="label-task"
                                onClick={() => props.handleCheckbox(toDoItem.id)}
                            >{toDoItem.task.substr(0, 30)}</label>
                            <button 
                                onClick={() => props.remove(toDoItem.id)}
                                className='delete-task-btn'
                            >x</button>
                        </div>
                    )
                }
            })
        }</div>
    )
}