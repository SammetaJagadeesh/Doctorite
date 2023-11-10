
import React from 'react';
import './FileInput.css'; 

function FileInput({ onFileChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileChange(file);
  };

  return (
    <div className="file-input-container">
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
}

export default FileInput;
