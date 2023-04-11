import { useState } from 'react';
import ist from './ist.png'

function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) {
      return;
    }
    const newTask = {
      name: inputValue,
      time: new Date().toLocaleString()
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setInputValue(tasks[index].name);
  };

  const handleSave = (index) => {
    const newTasks = [...tasks];
    newTasks[index].name = inputValue;
    setTasks(newTasks);
    setEditingIndex(-1);
    setInputValue('');
  };

  return (
    <div className=' h-screen bg-gradient-to-r from-rose-600/30 via-white to-yellow-600/30'>
      <div className="max-w-md mx-auto flex flex-col justify-center h-[500px]">
        <div>
          <img src={ist} className='ml-12 h-[200px] w-[320px] ' />
        </div>
        <form onSubmit={handleSubmit} className="flex mt-4">
          <input
            type="text"
            placeholder="Enter a task"
            value={inputValue}
            onChange={handleInputChange}
            className="flex-grow border border-gray-400 p-2 rounded-l"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
            Add
          </button>
        </form>
        <ul className="mt-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-400 py-2">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-grow border border-gray-400 p-2 rounded-l"
                  />
                  <button onClick={() => handleSave(index)} className="bg-blue-500 text-white p-2 rounded-r">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{task.name} ({task.time})</span>
                  <div>
                    <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todolist;
