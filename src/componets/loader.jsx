import { useEffect, useState } from "react";

function Loader({ loading, message }) {

  const colors = [
    "text-primary",
    "text-success",
    "text-danger",
    "text-warning",
    "text-info",
  ];

  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 700);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  // ⭐⭐⭐ IMPORTANT : overlay styles (page block nahi karega)
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(3px)",
    zIndex: 9999,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    pointerEvents: "none"   // ⭐ page clickable rahega
  };

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    background: "#fff",
    padding: "22px 28px",
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,.15)",
    pointerEvents: "auto"
  };

  const textStyle = {
    fontSize: 14,
    color: "#555",
    fontWeight: 500
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <div
          className={`spinner-grow ${colors[colorIndex]} p-4 border border-primary`}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>

        <p style={textStyle}>{message}</p>
      </div>
    </div>
  );
}

export default Loader;