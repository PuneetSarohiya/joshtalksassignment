import React, { useState } from "react";
import { truncate } from "lodash";
import styles from "../../Styles/card.module.css";

function TaskCard({ item, handleEdit, handleDelete, handleComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityCardStyle = (priority) => {
    switch (priority) {
      case "high":
        return "linear-gradient(to bottom right, #ffcccc, #ff9999)";
      case "medium":
        return "linear-gradient(to bottom right, #fff9c4, #fff176)";
      case "low":
        return "linear-gradient(to bottom right, #f5f5f5, #dcdcdc)";
      default:
        return "linear-gradient(to bottom right, #f5f5f5, #dcdcdc)";
    }
  };

  const toggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={styles["container"]}
      style={{ position: "relative", paddingBottom: "40px" }}
    >
      <div className={styles["icon-wrapper"]}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: item.completed ? "20px" : 0,
          }}
        >
          <div>
            {item.completed && (
              <div
                style={{
                  padding: "3px 15px",
                  background: "red",
                  borderRadius: "5px",
                }}
              >
                <span style={{ color: "white" }}>Completed</span>
              </div>
            )}
          </div>

          <div
            style={{
              padding: "3px 15px",
              background: priorityCardStyle(item.priority),
              borderRadius: "5px",
            }}
          >
            <span style={{ color: "black" }}>{item.priority}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <img
            src="edit-doc.png"
            alt="Edit Task"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
              marginRight: "8px",
              width: "25px",
              height: "25px",
            }}
          />
          <img
            src="delete.png"
            alt="Delete Task"
            onClick={handleDelete}
            style={{ cursor: "pointer", width: "25px", height: "25px" }}
          />
        </div>
      </div>

      <p className={styles["heading-text"]}>
        Title: <span>{item.title || "React Js"}</span>
      </p>

      <p className={styles["heading-text"]}>
        Description:
        <span>
          {" "}
          {isExpanded
            ? item.description
            : truncate(item.description, { length: 150 })}
        </span>
        {item.description.length > 150 && (
          <span
            onClick={toggleDescription}
            style={{
              cursor: "pointer",
              color: "orange",
              textDecoration: "underline",
              marginLeft: "5px",
            }}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        )}
      </p>

      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <button className={styles["taskbutton"]} onClick={handleComplete}>
          <span style={{ color: "white" }}>Task Complete</span>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
