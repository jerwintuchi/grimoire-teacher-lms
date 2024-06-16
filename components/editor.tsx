"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleChange = (content: string) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    onChange(sanitizedContent);
  };
  return (
    <div className="bg-[#181622] hover:bg-[#291839]">
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
    </div>
  );
};
