export interface TextoDocument {
  id: string;
  texto: string;
}

export interface WorkLinks {
  name:string;
  link:string;
}

export interface AddLinkProps {
  type:string
}

export interface AddLinkPromptProps {
  type:string;
  visibility:boolean;
  hideVisibility: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}