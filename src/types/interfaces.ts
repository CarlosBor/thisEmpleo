import { ReactNode } from "react";

export interface TextoDocument {
  id: string;
  texto: string;
}

export interface WorkLinks {
  name:string;
  link:string;
  id:string;
  type:string;
}

export interface LinkData{
  link:string,
  name:string
}

export interface AddLinkProps {
  type:string;
  data:LinkData[];
}

export interface AddLinkPromptProps {
  type:string;
  visibility:boolean;
  hideVisibility: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface WrapperProps {
  children: ReactNode;
}