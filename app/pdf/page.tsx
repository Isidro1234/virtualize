'use client';
 
import { PDFViewer } from '@embedpdf/react-pdf-viewer';
 
export default function ViewerPage() {
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer 
        config={{
          src: 'https://pub-937d4ae5488d4a0a8c4dacb4f8f8404a.r2.dev/Dikila_60_Day_Fullstack_Roadmap.pdf'
        }}
      />
    </div>
  );
}