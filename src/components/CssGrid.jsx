import React, { useState } from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

function CssGrid() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [copied, setCopied] = useState(false);

  const generateGridStyle = () => {
    return {
      display: "grid",
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    };
  };

  const generateGridStyleString = () => {
    const style = generateGridStyle();
    return `
      display: ${style.display};
      grid-template-rows: ${style.gridTemplateRows};
      grid-template-columns: ${style.gridTemplateColumns};
    `;
  };

  const generateGridItems = () => {
    const gridItems = [];
    for (let i = 0; i < rows * columns; i++) {
      gridItems.push(
        <div
          key={i}
          className="bg-gray-800 border text-white flex items-center justify-center"
        >
          {i + 1}
        </div>
      );
    }
    return gridItems;
  };

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const onChangeRows = (e) => {
    const newRows = parseInt(e.target.value);
    if (newRows < 0) {
      setRows(0);
    } else {
      setRows(newRows);
    }
  };

  const onChangeColumns = (e) => {
    const newColumns = parseInt(e.target.value);
    if (newColumns < 0) {
      setColumns(0);
    } else {
      setColumns(newColumns);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">CSS Grid Generator</h1>
        <div className="flex justify-between">
        <div className="mb-4 space-y-1">
          <label className="block">Rows:</label>
          <input
            type="number"
            value={rows}
            onChange={onChangeRows}
            className="border rounded px-2 py-1 w-36 text-white font-semibold bg-gray-800 outline-none text-center"
          />
        </div>
        <div className="mb-4 space-y-1">
          <label className="block">Columns:</label>
          <input
            type="number"
            value={columns}
            onChange={onChangeColumns}
            className="border rounded px-2 py-1 w-36  text-white font-semibold bg-gray-800 outline-none text-center"
          />
        </div>
        </div>
        <div className="mb-4 space-y-3 flex justify-center items-center flex-col">
          <label className="block">Generated CSS:</label>
          <textarea
            value={generateGridStyleString()}
            readOnly
            className="border rounded p-1 w-80 h-36 text-white font-semibold bg-gray-800 outline-none"
          />
          <CopyToClipboard
            text={generateGridStyleString()}
            onCopy={onCopy}
          >
            <button className="border px-8 rounded cursor-pointer py-2">
              {copied ? "Copied!" : "Copy"}
            </button>
          </CopyToClipboard>
        </div>
        <div style={generateGridStyle()} className="text-black">
          {generateGridItems()}
        </div>
      </div>
    </div>
  );
}

export default CssGrid;
