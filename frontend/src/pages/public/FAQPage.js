// src/pages/public/FAQPage.js
import React, { useState } from "react";
import "./FAQPage.css";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is GAUSS Vendor App?",
      a: "GAUSS helps vendors manage products, orders, sales analytics and business operations from a single dashboard.",
    },
    {
      q: "How do I register as a vendor?",
      a: "You can create an account through the Vendor Registration page. Depending on your signup flow, admin approval may be required.",
    },
    {
      q: "How do customers place orders?",
      a: "Customers order from the GAUSS customer platform, while you receive the orders inside your vendor dashboard.",
    },
    {
      q: "Are payments secure?",
      a: "Yes. All payments are processed using trusted gateways like Paystack and Flutterwave.",
    },
    {
      q: "Can I manage my products?",
      a: "Yes. You can add, edit, update stock, and manage products easily from your dashboard.",
    },
    {
      q: "What if I have issues?",
      a: "You can contact our support team anytime via the Contact Page.",
    },
  ];

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find quick answers to the most common questions vendors ask.</p>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <h3>{item.q}</h3>
              <span>{openIndex === index ? "-" : "+"}</span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
