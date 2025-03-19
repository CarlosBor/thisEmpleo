export interface TextoDocument {
  id: string;
  texto: string;
}

export interface WorkLinks {
  name:string;
  link:string;
}

interface LinkData{
  link:string,
  name:string
}

export interface AddLinkProps {
  type:string
  data:{
     id:string,
     data:Array<LinkData>
  }
}

export interface AddLinkPromptProps {
  type:string;
  visibility:boolean;
  hideVisibility: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

