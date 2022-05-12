import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [index, setIndex] = useState(0);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    // Obs.: usar "random" para gerar o id é muito error-prone pra mim... 
    //       portanto, prefiro implementar a indexação
    
    if(!newTaskTitle) return;

    const newTask = {
      id: index,
      title: newTaskTitle,
      isComplete: false
    };
    
    setTasks([...tasks, newTask]);
    setIndex(index + 1);
    setNewTaskTitle('');

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const theTasks = tasks.map(task => task.id === id ? {
      ...task, isComplete: !task.isComplete} : task);

    setTasks(theTasks);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const remainingTasks = tasks.filter(task =>task.id !== id)

   if(remainingTasks.length === 0) //Array vazio ? 
    setIndex(0); // ... então zera o index 

    setTasks(remainingTasks);
    
    console.log(index);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}