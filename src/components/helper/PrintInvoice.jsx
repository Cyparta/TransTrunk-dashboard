"use client"; // Ensure this is a client component

import { useRef } from "react";

const PrintButton = ({ printRef }) => {
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { color: #333; }
            p { color: #666; }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return <button onClick={handlePrint}>Print Invoice</button>;
};

export default PrintButton;
