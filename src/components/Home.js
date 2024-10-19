import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard/TaskCard';
import Header from './Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { loadtasksDetails } from '../Redux/Action/Appaction';
import { getAgentsTasksDetails } from '../Redux/Reducer/Appreducer';
import styles from '../Styles/taskform.module.css';
import TaskSearchFilter from './TaskSearchFilter';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [formData, setFormData] = useState({ 
    title: '', 
    priority: null, 
    description: '', 
    completed: false 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isshowtaskModal, setIsShowTaskModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
    dispatch(loadtasksDetails(storedTasks));
  }, [dispatch]);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedPriority === '' || task.priority === selectedPriority) && 
      (!showCompleted || task.completed)
    );
    setFilteredTasks(filtered);
  }, [searchTerm, selectedPriority, tasks, showCompleted]);

  const handleOpenTaskModal = () => setIsShowTaskModal(true);

  const handleCloseTaskModal = () => setIsShowTaskModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriorityChange = (value) => {
    setFormData({ ...formData, priority: value });
  };

  const handleSubmit = () => {
    let updatedTasks;
    if (isEditing) {
      updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, ...formData } : task
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, { ...formData, completed: false }];
    }
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setFormData({ title: '', priority: null, description: '', completed: false });
    dispatch(loadtasksDetails(updatedTasks));
  };

  const handleEdit = (index) => {
    
    setFormData(tasks[index]);
    setIsEditing(true);
    setEditIndex(index);
    handleOpenTaskModal();
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handlePrioritySelectChange = (value) => {
    setSelectedPriority(value);
    handleCloseTaskModal()
  };

  const toggleShowCompleted = () => {
    setShowCompleted(prev => !prev);
  };

  const handleSortByPriority = () => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }; 
    const sortedTasks = [...tasks].sort((a, b) => {
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    });
    setTasks(sortedTasks);
    setFilteredTasks(sortedTasks);
    setIsSorted(true); 
  };

  const priorityOptions = [
    { value: '', label: 'All' }, 
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];


  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedPriority('');
    setShowCompleted(false);
    setIsSorted(false);
    setFilteredTasks(tasks);
  };

  return (
    <div>
      <Header 
        handleInputChange={handleInputChange}
        handlePriorityChange={handlePriorityChange}
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        priorityOptions={priorityOptions}
        formData={formData}
        isEditing={isEditing}
        editIndex={editIndex}
        isshowtaskModal={isshowtaskModal}
        handleOpenTaskModal={handleOpenTaskModal}
        handleCloseTaskModal={handleCloseTaskModal}
      />
      <div>
        <TaskSearchFilter
          handleSearchChange={handleSearchChange}
          selectedPriority={selectedPriority}
          handlePrioritySelectChange={handlePrioritySelectChange}
          priorityOptions={priorityOptions}
          toggleShowCompleted={toggleShowCompleted}
          showCompleted={showCompleted}
          searchTerm={searchTerm}
          handleSortByPriority={handleSortByPriority}
          isSorted={isSorted}
          width={width}
          handleCloseTaskModal={handleCloseTaskModal}
          handleResetFilters={handleResetFilters}
        />
      </div>
      <div className={styles['task-container-wrapper']}>
        <div className={styles['task-container']}>
          {filteredTasks.map((item, index) => (
            <TaskCard 
              key={index}
              item={item}
              handleEdit={() => handleEdit(index)}
              handleDelete={() => handleDelete(index)}
              handleComplete={() => handleComplete(index)}
            />
          ))}
          {filteredTasks.length < 1 && <span className={styles['no-task-text']}>No Task</span> }
        </div>
      </div>
    </div>
  );
}

export default Home;

