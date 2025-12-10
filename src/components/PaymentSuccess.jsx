import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './PaymentSuccess.css';

const PaymentSuccess = ({ vehicleData, selectedPlan, onBack, userEmail }) => {
  const invoiceRef = useRef();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
  const orderNumber = `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  
  const downloadInvoice = async () => {
    try {
      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a0a1a'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Vehicle_Report_Invoice_${invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="payment-success-container">
      {/* Header Actions */}
      <div className="invoice-header-actions">
        <div className="success-title">
          <div className="success-icon">✨</div>
          <h1>Payment Successful!</h1>
        </div>
        <div className="action-buttons">
          <button className="btn download-btn" onClick={downloadInvoice}>
            <span className="btn-icon">📄</span>
            Download Invoice
          </button>
          <button className="btn back-btn" onClick={onBack}>
            <span className="btn-icon">🔍</span>
            Search Another VIN
          </button>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="invoice-card" ref={invoiceRef}>
        {/* Invoice Header */}
        <div className="invoice-main-header">
          <div className="company-logo-section">
            <div className="logo-container">
              <span className="logo-icon">🚗</span>
              <div className="logo-text">
                <h2>AutoReport</h2>
                <span className="logo-tagline">Vehicle Intelligence</span>
              </div>
            </div>
            <div className="invoice-title">
              <h1>INVOICE</h1>
              <div className="invoice-meta">
                <div className="meta-item">
                  <span className="meta-label">Invoice #</span>
                  <span className="meta-value">{invoiceNumber}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Date</span>
                  <span className="meta-value">{currentDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="billing-grid">
          <div className="billing-card company-card">
            <h3 className="billing-title">From</h3>
            <div className="company-info">
              <p className="company-name">AutoReport Solutions Inc.</p>
              <p>123 Vehicle Intelligence Lane</p>
              <p>Auto City, AC 10001</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ support@autoreport.com</p>
            </div>
          </div>
          
          <div className="billing-card customer-card">
            <h3 className="billing-title">Bill To</h3>
            <div className="customer-info">
              <p className="customer-email">{userEmail}</p>
              <p className="customer-type">Digital Report Purchase</p>
              <p>Order #: {orderNumber}</p>
              <p>Status: <span className="status-badge paid">Paid</span></p>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="vehicle-section">
          <h3 className="section-title">
            <span className="title-icon">🚘</span>
            Vehicle Information
          </h3>
          <div className="vehicle-details-grid">
            <div className="vehicle-detail">
              <span className="detail-label">Year</span>
              <span className="detail-value highlight">{vehicleData?.year || 'N/A'}</span>
            </div>
            <div className="vehicle-detail">
              <span className="detail-label">Make</span>
              <span className="detail-value highlight">{vehicleData?.make || 'N/A'}</span>
            </div>
            <div className="vehicle-detail">
              <span className="detail-label">Model</span>
              <span className="detail-value highlight">{vehicleData?.model || 'N/A'}</span>
            </div>
            <div className="vehicle-detail full-width">
              <span className="detail-label">VIN</span>
              <span className="detail-value code">{vehicleData?.vin || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3 className="section-title">
            <span className="title-icon">📋</span>
            Order Summary
          </h3>
          <div className="summary-table">
            <div className="table-header">
              <div className="table-col description">Description</div>
              <div className="table-col plan">Plan</div>
              <div className="table-col validity">Validity</div>
              <div className="table-col amount">Amount</div>
            </div>
            <div className="table-row">
              <div className="table-col description">
                <span className="item-name">Vehicle History Report</span>
                <span className="item-desc">Complete vehicle history and analysis</span>
              </div>
              <div className="table-col plan">
                <span className="plan-badge">{selectedPlan?.name || 'Standard'}</span>
              </div>
              <div className="table-col validity">
                <span className="validity-days">{selectedPlan?.id === 'premium' ? '30' : '7'} days</span>
              </div>
              <div className="table-col amount">
                <span className="price">${selectedPlan?.price?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
            <div className="table-footer">
              <div className="total-label">Total Amount</div>
              <div className="total-amount">
                ${selectedPlan?.price?.toFixed(2) || '0.00'}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="delivery-info">
          <h3 className="section-title">
            <span className="title-icon">📧</span>
            Report Delivery
          </h3>
          <div className="delivery-grid">
            <div className="delivery-status">
              <div className="status-icon">⏳</div>
              <div className="status-content">
                <h4>Processing Report</h4>
                <p className="status-text">Your report is being generated...</p>
              </div>
            </div>
            <div className="delivery-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value email-display">{userEmail}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Delivery Time:</span>
                <span className="detail-value">5-10 minutes</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Access Duration:</span>
                <span className="detail-value highlight">
                  {selectedPlan?.id === 'premium' ? '30' : '7'} days
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="payment-info">
          <h3 className="section-title">
            <span className="title-icon">💳</span>
            Payment Information
          </h3>
          <div className="payment-details">
            <div className="payment-item">
              <span className="payment-label">Payment Method</span>
              <span className="payment-value">Online Payment (Card)</span>
            </div>
            <div className="payment-item">
              <span className="payment-label">Transaction ID</span>
              <span className="payment-value code">
                TXN{Math.random().toString(36).substring(2, 15).toUpperCase()}
              </span>
            </div>
            <div className="payment-item">
              <span className="payment-label">Payment Status</span>
              <span className="payment-value success">✅ Completed</span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="important-notes">
          <h3 className="section-title">
            <span className="title-icon">📝</span>
            Important Notes
          </h3>
          <ul className="notes-list">
            <li>
              <span className="note-icon">📬</span>
              Check your inbox (including spam folder) for the report
            </li>
            <li>
              <span className="note-icon">🔗</span>
              Click the secure link in the email to access your report
            </li>
            <li>
              <span className="note-icon">💾</span>
              Save the report PDF for future reference
            </li>
            <li>
              <span className="note-icon">⏰</span>
              Contact support if not received within 15 minutes
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <div className="footer-content">
            <div className="thank-you">
              <p className="thank-you-text">Thank you for your purchase!</p>
              <p className="signature">— The AutoReport Team</p>
            </div>
            <div className="contact-info">
              <p>Need help? Contact us: support@autoreport.com | (555) 123-4567</p>
              <p className="footer-note">This is a digital product. No physical items will be shipped.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;