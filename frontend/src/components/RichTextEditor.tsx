"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px] whitespace-pre-wrap break-words",
      },
    },
  });

  if (!editor) {
    return <div className="border rounded-md p-2 min-h-[200px] bg-slate-50" />;
  }

  return (
    <div className="w-full border rounded-md p-2 bg-white focus-within:ring-2 focus-within:ring-ring overflow-hidden">
      <EditorContent
        editor={editor}
        className="w-full"
      />
    </div>
  );
}
