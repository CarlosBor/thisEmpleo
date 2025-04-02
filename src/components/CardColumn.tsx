import { WrapperProps } from '../types/interfaces';
import style from './CardColumn.module.css';

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