"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
import DOMPurify from "dompurify";
interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const sanitizedContent = DOMPurify.sanitize(value);

  return <ReactQuill theme="bubble" value={sanitizedContent} readOnly />;
};
