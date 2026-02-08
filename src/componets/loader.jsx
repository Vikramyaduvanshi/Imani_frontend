import { useEffect, useState } from "react";
import "../App.css"
const styles = {
  spinners: {
    height: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
};

function Loader({ loading ,message}) {
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

  return (
    <div style={styles.spinners}>
      <div
        className={`spinner-grow ${colors[colorIndex]} p-4 border border-primary`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
<p className="loading-text">
  {message}
</p>


    </div>
  );
}

export default Loader;
