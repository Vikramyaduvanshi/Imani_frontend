// components/CheckoutSteps.jsx
import "../App.css"
export function CheckoutSteps({ steps, currentStep }) {
  return (
    <div className="stepper-container">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div className="stepper-item" key={label}>
            {/* CIRCLE */}
            <div
              className={`step-circle ${
                isCompleted || isActive ? "active" : ""
              }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            {/* LABEL */}
            <div className="step-label">{label}</div>

            {/* LINE */}
            {index !== steps.length - 1 && (
              <div
                className={`step-line ${
                  stepNumber < currentStep ? "active" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
