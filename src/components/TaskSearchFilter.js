import React, { useState } from "react";
import { Select, Modal } from "antd";
import styles from "../Styles/taskform.module.css";

function TaskSearchFilter({
  handleSearchChange,
  selectedPriority,
  handlePrioritySelectChange,
  priorityOptions,
  toggleShowCompleted,
  showCompleted,
  searchTerm,
  handleSortByPriority,
  width,
  handleResetFilters,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedPriority);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleSelect = (value) => {
    setSelectedOption(value);
    handlePrioritySelectChange(value);
    closeModal();
  };

  const filterCompletedButton = () => {
    toggleShowCompleted();
    closeModal();
  };

  const filterSortutton = () => {
    handleSortByPriority();
    closeModal();
  };

  return (
    <div>
      {width < 768 && (
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          className={styles["search-input"]}
          onChange={handleSearchChange}
        />
      )}
      <div className={styles["search-container"]}>
        {width > 768 ? (
          <div>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              className={styles["search-input"]}
              onChange={handleSearchChange}
            />
            <Select
              style={{ width: 200, margin: "0 10px" }}
              placeholder="Select Priority"
              value={selectedPriority}
              onChange={handleSelect}
              allowClear
              options={priorityOptions}
            />
            <button onClick={toggleShowCompleted} className={styles["button"]}>
              {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
            </button>
            <button
              onClick={handleSortByPriority}
              className={styles["button"]}
              style={{ marginLeft: "20px" }}
            >
              Sort by Priority
            </button>
          </div>
        ) : (
          <div className={styles["button-container"]}>
            <button className={styles["next-btn"]} onClick={openModal}>
              Filter
            </button>
            <button className={styles["next-btn"]} onClick={handleResetFilters}>
              Reset
            </button>
            <Modal
              title="Apply Filters"
              visible={isModalVisible}
              onCancel={closeModal}
              footer={null}
              bodyStyle={{ height: 200 }}
            >
              <Select
                style={{ width: "100%", margin: "10px 0" }}
                placeholder="Select Priority"
                value={selectedOption}
                onChange={handleSelect}
                allowClear
                options={priorityOptions}
              />
              <button
                onClick={filterCompletedButton}
                className={styles["button"]}
                block
              >
                {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
              </button>
              <button
                onClick={filterSortutton}
                className={styles["button"]}
                style={{ marginTop: "10px" }}
                block
              >
                Sort by Priority
              </button>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskSearchFilter;
