export type BlockType =
  | "cover"
  | "text"
  | "code"
  | "callout"
  | "checklist"
  | "table"
  | "cta";

export type CalloutVariant =
  | "tip"
  | "warning"
  | "danger"
  | "info"
  | "success";

export type HeadingLevel = 1 | 2 | 3;

export interface CoverData {
  title: string;
  subtitle: string;
  version: string;
  author: string;
  accentColor: string;
  theme: "dark" | "light";
}

export interface TextData {
  heading?: string;
  headingLevel?: HeadingLevel;
  body: string;
  style?: "normal" | "intro" | "caption";
}

export interface CodeData {
  language: string;
  code: string;
  caption?: string;
  showLineNumbers?: boolean;
}

export interface CalloutData {
  variant: CalloutVariant;
  title: string;
  body: string;
  icon?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  done: boolean;
}

export interface ChecklistData {
  title?: string;
  items: ChecklistItem[];
}

export interface TableData {
  caption?: string;
  headers: string[];
  rows: string[][];
  highlightFirstColumn?: boolean;
}

export interface CTAData {
  headline: string;
  subtext: string;
  buttonText: string;
  buttonUrl: string;
  variant: "dark" | "accent";
}

export type BlockData =
  | CoverData
  | TextData
  | CodeData
  | CalloutData
  | ChecklistData
  | TableData
  | CTAData;

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  data: BlockData;
}