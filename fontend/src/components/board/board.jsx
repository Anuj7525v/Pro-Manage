import React, { useState, useEffect } from 'react';
import TodoCard from '../todocard/TodoCard';
import TaskForm from '../TaskForm/TaskForm';
import colaps from '../../assets/codicon.png';
import './board.css';
import Tasks from '../Taskboard';
import { getAllTasks } from '../../services/task';
import { Toaster, toast } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import assign from "../../assets/Group 3779addcolab.png";
import AddUser from '../adduser/adduser'; // Assuming correct path for AddUser component
import { BACKEND_URL } from '../../constant';





const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [change, setChange] = useState(" ");
  const notify = (data) => toast.success("Status update");
  const [timeframe, setTimeframe] = useState();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [collapsedAll, setCollapsedAll] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [assignEmail, setAssignEmail] = useState('');
  const [assignError, setAssignError] = useState('');

  const toggleCollapse = () => {
    setCollapsedAll(!collapsedAll);
  };

  const [collapsedColumns, setCollapsedColumns] = useState({
    backlog: false,
    todo: false,
    inProgress: false,
    done: false,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getAllTasks(timeframe);
      if (tasksData) {
        setTasks(tasksData);
      } else {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [change, timeframe]);

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  function handleDataFromChild(data) {
    setChange(data);
    notify(`Status changed to ${data}`);
  }

  const handleSaveTask = async (taskData) => {
    try {
      const url = taskData._id
        ? `${BACKEND_URL}/api/tasks/${taskData._id}`
        : `${BACKEND_URL}/api/tasks`;
      console.log("Task ID :", taskData.id);
      const method = taskData._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`Failed to save task: ${errorData.message}`);
      }

      const savedTask = await response.json();
      notify(taskData._id ? "Task Updated" : "Task Created");

      setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks };
        if (taskData._id) {
          updatedTasks.data = updatedTasks.data.map(task =>
            task._id === savedTask._id ? savedTask : task
          );
        } else {
          updatedTasks.data = [...updatedTasks.data, savedTask];
        }
        return updatedTasks;
      });

      setShowTaskForm(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleAssign = async (email) => {
    try {
      // Call backend API to check if user with `email` exists
      const response = await fetch(`${BACKEND_URL}/api/users/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('User not found');
      }

      // If user exists, perform assignment logic
      // Example logic: update task with assigned user
      // Replace with your specific logic here

      setAssignError('');
      setShowAddUser(false);
    } catch (error) {
      setAssignError('User not found');
      console.error('Error assigning user:', error);
    }
  };

  const handleAssignCancel = () => {
    setShowAddUser(false);
    setAssignEmail('');
    setAssignError('');
  };

  const openAssignPopup = () => {
    setShowAddUser(true);
  };

  const handleDelete = async (id) => {
    try {
      const url = `${BACKEND_URL}/api/tasks/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      notify('Task deleted');

      setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks };
        updatedTasks.data = updatedTasks.data.filter(task => task._id !== id);
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="board-container">
      <Toaster />

      <div className="select-container">
        <l className="board-text"><p1>Board <img src={assign} alt="" onClick={openAssignPopup} /></p1>
          <p className='filterbtn'>  <select id="timeframe" name="timeframe" onChange={handleTimeframeChange}>
            <option value="thisWeek">This Week</option>
            <option value="today">Today</option>
            <option value="thisMonth">This Month</option>
          </select></p></l>

      </div>

      <div className="board">
        {['BACKLOG', 'TO DO', 'IN PROGRESS', 'DONE'].map(column => (
          <div className="column" key={column}>
            <div className="column-header">
              <h3>{column}</h3>
              <div className="column-sub-header">
                {column === 'TO DO' && (
                  <span className="create-task-button" onClick={() => { setShowTaskForm(true); setCurrentTask(null); }}>
                    +
                  </span>
                )}
                <span className="collapse-icon" onClick={toggleCollapse}>
                  <img
                    src={colaps}
                  />
                </span>
              </div>
            </div>

            {!collapsedColumns[column.toLowerCase()] && (
              <div className="cards">

                {tasks && tasks.data && tasks.data.length > 0 ? (
                  tasks.data.map((task) => (
                    task.status === column &&
                    <Tasks
                      key={task._id}
                      id={task._id}
                      task={task}
                      sendDataToParent={handleDataFromChild}
                      onEdit={() => {
                        setShowTaskForm(true);
                        setCurrentTask(task);
                      }}
                      collapsedAll={collapsedAll} toggleCollapse={toggleCollapse}
                      onDelete={() => handleDelete(task._id)}
                    />
                  ))
                ) : (
                  <p>No tasks found</p>
                )}


                {/*         {tasks.length === 0 ? (
                  <p>No tasks found</p>
                ) : (
                  tasks.data.map((task) => (
                    task.status === column && 
                    <Tasks 
                      key={task._id}
                      id={task._id} 
                      task={task}  
                      sendDataToParent={handleDataFromChild}
                      onEdit={() => {
                        setShowTaskForm(true);
                        setCurrentTask(task);
                      }}
                      collapsedAll={collapsedAll} toggleCollapse={toggleCollapse}
                      onDelete={() => handleDelete(task._id)}
                    />
                  ))
                )}  */}
              </div>
            )}
          </div>
        ))}
      </div>

      {showTaskForm && (
        <div className="task-form-overlay">
          <div className="task-form-container">
            <TaskForm
              task={currentTask}
              onSave={handleSaveTask}
              onCancel={() => {
                setShowTaskForm(false);
                setCurrentTask(null);
              }}
            />
          </div>
        </div>
      )}

      {showAddUser && (
        <AddUser
          onConfirm={handleAssign}
          onCancel={handleAssignCancel}
        />
      )}

    </div>
  );
};

export default Board;