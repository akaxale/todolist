import React, {useState, useEffect} from 'react';
import Input from './Components/Input';
import List from './Components/List';

export default function App() {
  
  const [list, setList] = useState([])
  const [formData, setFormData] = useState(
    {
      id: Math.random(),
      task: '',
      isCompleted: false
    }
  );
  const [maxLength, setMaxLength] = useState(30)
  
  useEffect(() => {
    const storageList = JSON.parse(localStorage.getItem('to-do-list'))
    if (storageList) {
      setList(storageList)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('to-do-list', JSON.stringify(list))
  }, [list])
  
  function handleChange(e) {
    const {name, type, value, checked} = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      isCompleted: false,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  function handleCheckbox(id) {
    setList(list.map(listItem => {
        if (listItem.id === id) {
          return {
            ...listItem,
            isCompleted: !listItem.isCompleted,
            id: Math.random()
          }
        }
        return listItem
    }))
  }
  
  function add() {
    setList(prevList => ([
      {...formData},
      ...prevList
    ]))
    
    setFormData(prevData => ({
      task: '',
      isCompleted: false,
      id: Math.random()
    }))
  }
  
  function remove(id) {
    const newList = list.filter(toDoItem => toDoItem.id !== id)
    setTimeout(() => {
      setList(newList)
    }, 200)
  }
  
  function deleteCompletedTasks() {
    setList(taskRemaining)
  }
  
  const taskRemaining = list.filter(listItem => {
    if (listItem.task.trim()) {
      return !listItem.isCompleted
    } 
  })
  
  return (
    <main className='app'>
      <header>
        <h1>To Do List</h1>
      </header>
      
      <div>
        <Input
          task={formData.task.substr(0, 30)}
          handleChange={handleChange}
          add={add}
        />
        
        <div className='counters'>
          <p>{(maxLength - formData.task.length) < 0 ? 0 : maxLength - formData.task.length}</p>
          <p className='tasks-remaining'> {taskRemaining.length} {taskRemaining.length > 1 ? ' tasks ' : ' task '} remaining</p>
        </div>
        
        <List 
          list={list}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          remove={remove}
        />
        
        <div className='footer'>
          <button 
            onClick={deleteCompletedTasks} 
            className='delete-completed-tasks-btn footer-btn'
          >clear completed tasks</button>
          <button 
            onClick={() => setList([])} 
            className='delete-list-btn footer-btn'
          >delete list</button>
        </div>
        
      </div>
    </main>
  )
}