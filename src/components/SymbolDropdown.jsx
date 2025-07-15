import React, { useState, useRef, useEffect } from "react";
import "./SymbolDropdown.css";

export default function SymbolDropdown({ value, onChange, symbols = [] }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol) => {
    onChange(symbol);
    setOpen(false);
  };

  return (
    <div className="simple-dropdown" ref={dropdownRef}>
      <button
        className="simple-dropdown-toggle"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value || "Chọn mã cổ phiếu"}
      </button>

      {open && (
        <ul className="simple-dropdown-menu">
          {symbols.map((symbol) => (
            <li
              key={symbol}
              className={`simple-dropdown-item ${
                symbol === value ? "selected" : ""
              }`}
              onClick={() => handleSelect(symbol)}
            >
              {symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
