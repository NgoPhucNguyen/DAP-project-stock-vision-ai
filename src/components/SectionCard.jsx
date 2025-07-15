// src/components/SectionCard.jsx
import React from "react";
import "./SectionCard.css";

const SectionCard = ({ title, children, className = "" }) => {
  return (
    <section className={`section-card ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default SectionCard;
