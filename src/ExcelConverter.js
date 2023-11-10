
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import FileInput from './FileInput';
import './ExcelConverter.css'; 

function ExcelConverter() {
  const [jsonData, setJsonData] = useState([]);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonResult = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setJsonData(jsonResult);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    const ws = XLSX.utils.aoa_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  
    XLSX.writeFile(wb, 'edited_excel.xlsx', { bookType: 'xlsx', mimeType: 'application/octet-stream' });
  };

  return (
    <div className="excel-converter-container">
      <FileInput onFileChange={handleFileChange} />
      <table className="excel-table">
        <thead>
          <tr>
            {jsonData[0] &&
              jsonData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {jsonData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => {
                      jsonData[rowIndex + 1][cellIndex] = e.target.value;
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="export-button" onClick={handleExport}>Export Excel</button>
    </div>
  );
}

export default ExcelConverter;
