import React from "react";

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, right, children, className }) {
  /** Simple card with title and optional subtitle and right element. */
  return (
    <div className={`card ${className || ""}`}>
      {(title || right) && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12
        }}>
          <div style={{ flex: 1 }}>
            {title && <div className="section-title">{title}</div>}
            {subtitle && <div className="section-subtitle">{subtitle}</div>}
          </div>
          {right}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
