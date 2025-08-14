"use client";

import { type Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Code,
  FileCode,
  Heading2,
  Heading3,
  Pilcrow,
} from "lucide-react";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  const toolbarItems = [
    {
      icon: <Bold className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      canDo: editor.can().toggleBold(),
      title: "Bold",
      action: "bold"
    },
    {
      icon: <Italic className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      canDo: editor.can().toggleItalic(),
      title: "Italic",
      action: "italic"
    },
    {
      icon: <Strikethrough className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      canDo: editor.can().toggleStrike(),
      title: "Strikethrough",
      action: "strike"
    },
    {
      icon: <Code className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      canDo: editor.can().toggleCode(),
      title: "Inline Code",
      action: "code"
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      canDo: editor.can().toggleHeading({ level: 2 }),
      title: "Heading 2",
      action: "h2"
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      canDo: editor.can().toggleHeading({ level: 3 }),
      title: "Heading 3",
      action: "h3"
    },
    {
      icon: <Pilcrow className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph'),
      canDo: editor.can().setParagraph(),
      title: "Paragraph",
      action: "paragraph"
    },
    {
      icon: <List className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      canDo: editor.can().toggleBulletList(),
      title: "Bullet List",
      action: "bulletList"
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      canDo: editor.can().toggleOrderedList(),
      title: "Numbered List",
      action: "orderedList"
    },
    {
      icon: <FileCode className="w-4 h-4" />,
      onClick: () => editor.chain().focus().setCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
      canDo: editor.can().setCodeBlock(),
      title: "Code Block",
      action: "codeBlock"
    },
  ];

  return (
    <div className="flex items-center gap-1 p-1 border rounded-lg bg-background flex-wrap">
      {toolbarItems.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`p-2 rounded-md hover:bg-accent ${
            item.isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
          } ${!item.canDo ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!item.canDo}
          title={item.title}
          aria-label={item.title}
          type="button"
          data-active={item.isActive}
          data-action={item.action}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}