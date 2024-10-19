// import React, { useState } from 'react';
// import { Modal, Button } from 'antd'; 
// import styles from '../../Styles/header.module.css';
// import TaskModalForm from '../TaskModalForm';

// function Header({ 
//   width, 
//   handleInputChange, 
//   handlePriorityChange, 
//   handleSubmit, 
//   handleEdit, 
//   handleDelete, 
//   priorityOptions, 
//   formData, 
//   isEditing, 
//   editIndex ,
//   isShowTaskModal,
//   handleOpenTaskModal,
//   handleCloseTaskModal
// }) {
//   // const [isShowTaskModal, setShowTaskModal] = useState(false); 

//   // const handleOpenTaskModal = () => {
//   //   setShowTaskModal(true); 
//   // };

//   // const handleCloseTaskModal = () => {
//   //   setShowTaskModal(false); 
//   // };

//   return (
//     <header className={styles['header']}>
//       <div className={styles['logoContainer']}>
//         <img 
//           src="/josh-logo.svg" 
//           alt="Josh Logo" 
//           style={{ width: '70px', height: '60px' }}
//         />
//       </div>

//       <div className={styles['buttonContainer']}>
//         <Button className={styles['leadButton']} onClick={handleOpenTaskModal}>Add Task</Button>
//         <Button className={styles['loginButton']}>Login</Button>
//       </div>

//       <Modal
//         visible={isShowTaskModal}
//         onCancel={handleCloseTaskModal}
//         footer={null} 
//       >
//         <TaskModalForm 
//           handleInputChange={handleInputChange}
//           handlePriorityChange={handlePriorityChange}
//           handleSubmit={handleSubmit}
//           handleEdit={handleEdit}
//           handleDelete={handleDelete}
//           priorityOptions={priorityOptions}
//           formData={formData}
//           isEditing={isEditing}
//           editIndex={editIndex}
//           handleCloseTaskModal={handleCloseTaskModal} 
//         />
//       </Modal>
//     </header>
//   );
// }

// export default Header;








import React, { useState } from 'react';
import Modal from 'react-modal'; 
import { Button } from 'antd';
import styles from '../../Styles/header.module.css';
import TaskModalForm from '../TaskModalForm';

// Set the root element for the modal (important for accessibility)

function Header({ 
  width, 
  handleInputChange, 
  handlePriorityChange, 
  handleSubmit, 
  handleEdit, 
  handleDelete, 
  priorityOptions, 
  formData, 
  isEditing, 
  editIndex,
  isshowtaskModal,
  handleOpenTaskModal,
  handleCloseTaskModal
}) {

  return (
    <header className={styles['header']}>
      <div className={styles['logoContainer']}>
        <img 
          src="/josh-logo.svg" 
          alt="Josh Logo" 
          style={{ width: '70px', height: '60px' }}
        />
      </div>

      <div className={styles['buttonContainer']}>
        <Button className={styles['leadButton']} onClick={() => handleOpenTaskModal()}>
          Add Task
        </Button>
        <Button className={styles['loginButton']}>Login</Button>
      </div>

      <Modal
        isOpen={isshowtaskModal}
        onRequestClose={handleCloseTaskModal}
        className={styles['modalContent']}
        overlayClassName={styles['modalOverlay']}
      >
        <TaskModalForm 
          handleInputChange={handleInputChange}
          handlePriorityChange={handlePriorityChange}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          priorityOptions={priorityOptions}
          formData={formData}
          isEditing={isEditing}
          editIndex={editIndex}
          handleCloseTaskModal={handleCloseTaskModal}
        />
      </Modal>
    </header>
  );
}

export default Header;
