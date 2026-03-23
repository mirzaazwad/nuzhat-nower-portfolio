"use client";

import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfSnapshotProps {
  file: string;
}

export default function PdfSnapshot({ file }: PdfSnapshotProps) {
  return (
    <Document
      file={file}
      loading={<div className="w-full aspect-[1/1.4] animate-pulse bg-muted-foreground/10 rounded-sm" />}
    >
      <Page
        pageNumber={1}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        width={350}
        className="rounded-sm overflow-hidden border border-border/50 bg-white"
      />
    </Document>
  );
}
