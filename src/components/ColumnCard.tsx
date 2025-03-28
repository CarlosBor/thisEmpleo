import { WorkLinks } from "../types/interfaces";
import style from './ColumnCard.module.css';
import { removeDocument, collections, moveDocument } from '../api/firebaseDb';

export const ColumnCard = (props:WorkLinks) => {
    const position = collections.indexOf(props.type);
    const removeCard = (id:string) =>{
        console.log("Card with id removed: ", id);
        removeDocument(props.type, props.id)
    }
    const moveCardLeft = (id:string) => {
        const position = collections.indexOf(props.type)
        if(position==0){
            console.log("Cant move searchlinks")
            return
        }
        if(position>1){
            moveDocument(props.type, collections[position-1], id);
            console.log("Moved from ", props.type, " to ", collections[position-1]);
        }
    }
    const moveCardRight = (id:string) =>{
        const position = collections.indexOf(props.type)
        if(position==0){
            console.log("Cant move searchlinks")
            return
        }
        if(position<collections.length){
            moveDocument(props.type, collections[position+1], id);
            console.log("Moved from ", props.type, " to ", collections[position+1]);
        }
    }

    return(
        <div className={style.columnCard}>
            <p>{props.id}</p>
            <p>{props.link}</p>
            <p>{props.name}</p>
            <div className={style.removeButton} onClick={()=>{removeCard(props.id)}}>---</div>
            {(position==0) ? "" : 
                <>
                    {!(position>1) ? "" : 
                        <div className={style.moveButton} onClick={()=>{moveCardLeft(props.id)}}>&lt;&lt;&lt;</div>
                    }
                    {!(position<collections.length-1) ? "" :
                        <div className={style.moveButton} onClick={()=>{moveCardRight(props.id)}}>&gt;&gt;&gt;</div>                    
                    }
                </>
            }
         </div>
    )
}