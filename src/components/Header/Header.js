import React from "react";
import { Modal } from "antd";
import styles from "../../Styles/header.module.css";
import TaskModalForm from "../TaskModalForm";

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
  handleCloseTaskModal,
}) {
  return (
    <header className={styles["header"]}>
      <div className={styles["logoContainer"]}>
        <img
          src="/josh-logo.svg"
          alt="Josh Logo"
          style={{ width: "70px", height: "60px" }}
        />
      </div>

      <div className={styles["buttonContainer"]}>
        <button
          className={styles["leadButton"]}
          onClick={() => handleOpenTaskModal()}
        >
          Add Task
        </button>
        <button className={styles["loginButton"]}>Login</button>
      </div>

      <Modal
        visible={isshowtaskModal}
        onCancel={handleCloseTaskModal}
        footer={null}
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
