import { useEffect } from "react";

function ToastMessage({
  show,
  message,
  type = "success",
  duration = 4000,
  onClose,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const isSuccess = type === "success";

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle"
      style={{
        zIndex: 9999,
        animation: "zoomIn 0.35s ease-out",
      }}
    >
      <div
        className="toast show shadow-lg border-0 rounded-4"
        style={{
          minWidth: "320px",
          backgroundColor: isSuccess ? "#80f399" : "#f38787",
        }}
      >
        <div className="toast-body text-center">
          <p
            className="fw-semibold mb-3"
            style={{ color: isSuccess ? "#000000" : "#ffffff" }}
          >
            {message}
          </p>

          <button
            className={`btn btn-sm fw-semibold px-4 ${
              isSuccess ? "btn btn-outline-danger" : "btn btn-outline-primary"
            }`}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default ToastMessage;
