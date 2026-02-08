import { CheckoutSteps } from "../componets/checkout";

import axios from "axios";


export function Paymentfunction(){


const handlePayment = async () => {
    try {
      const res = await axios.post(
        "https://imaani-perfumes.onrender.com/api/payfast/create",
        {
          amount: "599.00",
          item_name: "Luxury Perfume"
        }
      );

      const {
        payfast_url,
        ...payfastData
      } = res.data;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = payfast_url;

      Object.entries(payfastData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (err) {
      console.error("Payment error:", err);
    }
  };




    

 return (
  <>
    <div style={styles.page}>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Secure Payment</h1>
        <p style={styles.subtitle}>Complete your order safely</p>
      </div>

      {/* Steps */}
      <div style={styles.steps}>
        <CheckoutSteps
          steps={["Cart", "Address", "Payment", "Summary"]}
          currentStep={3}
        />
      </div>

      {/* Payment Card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Pay using PayFast</h2>

        <div style={styles.infoRow}>
          <span>Order Amount</span>
          <strong>₹ 2,499</strong>
        </div>

        <div style={styles.infoRow}>
          <span>Payment Method</span>
          <strong>PayFast</strong>
        </div>

        <button onClick={handlePayment} style={styles.payBtn}>
          🔒 Pay Securely
        </button>

        <p style={styles.note}>
          Your payment is encrypted & 100% secure
        </p>
      </div>

    </div>
  </>
);

}




const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px"
  },

  header: {
    textAlign: "center",
    marginBottom: "30px"
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#333"
  },

  subtitle: {
    color: "#666",
    marginTop: "8px"
  },

  steps: {
    width: "100%",
    maxWidth: "700px",
    marginBottom: "30px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },

  cardTitle: {
    marginBottom: "20px",
    color: "#222"
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    fontSize: "15px",
    color: "#444"
  },

  payBtn: {
    width: "100%",
    padding: "14px",
    background: "#0f9d58",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "0.3s"
  },

  note: {
    textAlign: "center",
    fontSize: "12px",
    color: "#777",
    marginTop: "15px"
  }
};
