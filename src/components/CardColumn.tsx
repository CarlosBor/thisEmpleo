import { ReactNode } from "react";
import style from './CardColumn.module.css';

interface WrapperProps {
    children: ReactNode;
}

const CardColumn: React.FC<WrapperProps>  = ({ children }) => {
  return (
    <div className={style.wrapper}>
        <div className={style.content}>
            {children}
        </div>
    </div>
  );
};
export default CardColumn;


interface WrapperProps {
    children: ReactNode;
  }
  
//   const Wrapper: React.FC<WrapperProps> = ({ children }) => {
//     return (
//       <div className="wrapper">
//         <h2>I'm the Wrapper</h2>
//         <div className="content">{children}</div>
//       </div>
//     );
//   };