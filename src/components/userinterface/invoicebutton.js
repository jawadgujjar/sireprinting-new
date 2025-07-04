'use client';

import { useRef, useState } from 'react';
import ReactToPdf from 'react-to-pdf';
import { Button, Typography } from 'antd';

const { Text } = Typography;

const InvoicePdfButton = ({ imageUrl, trackingId }) => {
  const pdfRef = useRef();
  const [ready, setReady] = useState(false);

  return (
    <>
      <ReactToPdf
        targetRef={pdfRef}
        filename={`Invoice_${trackingId || 'invoice'}.pdf`}
        options={{ orientation: 'portrait', unit: 'px', format: [600, 842] }}
        x={0}
        y={0}
        scale={1}
      >
        {({ toPdf }) => (
          <Button
            type="primary"
            onClick={() => {
              setReady(true);
              setTimeout(() => toPdf(), 300);
            }}
          >
            Download
          </Button>
        )}
      </ReactToPdf>

      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={pdfRef}>
          {ready && (
            <img
              src={imageUrl}
              alt={`Invoice ${trackingId}`}
              style={{ width: '600px' }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default InvoicePdfButton;
