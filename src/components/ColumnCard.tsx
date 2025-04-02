import { WorkLinks } from "../types/interfaces";
import style from './ColumnCard.module.css';
import { removeDocument } from '../api/firebaseDb';
import DraggableItem from "./DraggableItem";

export const ColumnCard = (props: WorkLinks & { draggable?: boolean }) => {
    const removeCard = () => {
        removeDocument(props.type, props.id);
    };

    const cardContent = (
        <div className={`${style.columnCard} ${props.draggable ? style.draggable : ""}`}>
            <a className={style.cardLink} href={props.link}>{props.name}</a>
            <div className={style.cardButtons}>
                <div className={style.removeButton} onClick={() => removeCard()}></div>
            </div>
        </div>
    );

    return props.draggable ? (
        <DraggableItem id={props.id} type={props.type}>{cardContent}</DraggableItem>
    ) : (
        cardContent
    );
};
