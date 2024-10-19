import React from "react";
import { Select } from "antd";
import styles from "../Styles/taskform.module.css";

function TaskModalForm({
  handleInputChange,
  handlePriorityChange,
  handleSubmit,
  priorityOptions,
  formData,
  isEditing,
  handleCloseTaskModal,
}) {
  return (
    <div>
      <div>
        <p className={styles["heading-text"]}>
          {isEditing ? "Edit Task" : "Add Task"}
        </p>
      </div>

      <div>
        <p className={styles["subheading-text"]}>Title</p>
        <input
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleInputChange}
          className={styles["login-input"]}
        />
      </div>

      <div>
        <p className={styles["subheading-text"]}>Priority</p>
        <Select
          style={{ width: "100%" }}
          placeholder="Select Priority"
          value={formData.priority}
          onChange={handlePriorityChange}
          options={priorityOptions}
          className="selectStyles"
        />
      </div>

      <div>
        <p className={styles["subheading-text"]}>Description</p>
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleInputChange}
          className={styles["loginmessage-container"]}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            handleSubmit();
            handleCloseTaskModal();
          }}
          className={styles["taskbutton"]}
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
}

export default TaskModalForm;
