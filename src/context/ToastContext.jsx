import { createContext, useContext, useState } from "react";
import ToastMessage from "../componets/Toast";
// import ToastMessage from "../components/Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success", duration = 4000) {
    setToast({ show: true, message, type, duration });
  }

  function hideToast() {
    setToast((prev) => ({ ...prev, show: false }));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 🔥 GLOBAL TOAST */}
      <ToastMessage
        show={toast.show}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

// 🔥 Custom Hook
export function useToast() {
  return useContext(ToastContext);
}
