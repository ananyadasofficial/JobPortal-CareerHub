import React from "react";

const Resume = ({ imageUrl, onClose }) => {
  return (
    <div className="resume">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default Resume;