import { WorkLinks } from "../types/interfaces";
import style from './ColumnCard.module.css';
import { removeDocument } from '../api/firebaseDb';

export const ColumnCard = (props:WorkLinks) => {
    const removeCard = (id:string) =>{
        console.log(id);
        removeDocument(props.type, props.id)
    }
    return(
        <div className={style.columnCard}>
            <p>{props.id}</p>
            <p>{props.link}</p>
            <p>{props.name}</p>
            <div className={style.removeButton} /* onClick={removeCard} */>-</div>
         </div>
    )
}