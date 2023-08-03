export interface IIfElse {
  id: string;
  if: templateType;
  then: templateType;
  else: templateType;
}
export interface ITextArea {
  id: string;
  value: string;
}
export type templateItem = ITextArea | IIfElse;
export type templateType = Array<templateItem>;
