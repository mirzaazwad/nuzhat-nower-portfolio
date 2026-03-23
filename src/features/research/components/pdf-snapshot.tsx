"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfSnapshotProps {
  file: string;
}

export default function PdfSnapshot({ file }: PdfSnapshotProps) {
  return (
    <Document
      file={file}
      loading={
        <div className="w-full aspect-[1/1.4] animate-pulse bg-muted-foreground/10 rounded-sm" />
      }
    >
      <div className="w-full flex justify-center *:max-w-full [&_canvas]:max-w-full! [&_canvas]:h-auto!">
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={500}
          className="rounded-sm overflow-hidden border border-border/50 bg-white"
        />
      </div>
    </Document>
  );
}
