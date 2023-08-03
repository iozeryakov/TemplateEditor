import { ReactNode } from "react";
import { IIfElse, ITextArea, templateType } from "./template";

export interface IBlock {
  list: templateType;
  setLastSelect: React.Dispatch<
    React.SetStateAction<{
      id: string;
      index: number;
    }>
  >;
  setValue(elem: ITextArea): void;
  deleteIf(id: string): void;
}
export interface IIfThenElse {
  item: IIfElse;
  setLastSelect: React.Dispatch<
    React.SetStateAction<{
      id: string;
      index: number;
    }>
  >;
  setValue(elem: ITextArea): void;
  deleteIf(id: string): void;
}
export interface IInput {
  id: string;
  name: string;
  value: string;
  onChange(name: string, value: string): void;
}
export interface IModal {
  id: string;
  children: ReactNode;
}
export interface IPreview {
  arrVarNames: string[];
  template: templateType;
}
export interface ITemplateEditor {
  arrVarNames: string[];
  template: templateType | null;
  callbackSave: (template: templateType) => Promise<void>;
}
export interface ITextarea {
  text: ITextArea;
  setLastSelect: React.Dispatch<
    React.SetStateAction<{
      id: string;
      index: number;
    }>
  >;
  setValue(elem: ITextArea): void;
}
