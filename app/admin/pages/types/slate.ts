
import { Element, Text } from 'slate';

export type BlockType =
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'bulleted-list'
  | 'numbered-list'
  | 'list-item'
  | 'blockquote'
  | 'image';

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  background?: string;
};

export type CustomElement = {
  type: BlockType;
  align?: string;
  url?: string;
  children: (CustomElement | CustomText)[];
};

export type CustomDescendant = CustomElement | CustomText;

declare module 'slate' {
  interface CustomTypes {
    Element: CustomElement;
    Text: CustomText;
  }
}
