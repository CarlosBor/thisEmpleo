import { WorkLinks } from "../types/interfaces";
import style from './ColumnCard.module.css';
import { removeDocument } from '../api/firebaseDb';
import DraggableItem from "./DraggableItem";

export const ColumnCard = (props: WorkLinks & { draggable?: boolean }) => {
    const removeCard = (id: string) => {
        console.log("🗑️ Removing card with id:", id);
        removeDocument(props.type, props.id);
    };

    const cardContent = (
        <div className={style.columnCard}>
            <a className={style.cardLink} href={props.link}>{props.name}</a>
            <div className={style.cardButtons}>
                <div className={style.removeButton} onClick={() => removeCard(props.id)}>---</div>
            </div>
        </div>
    );

    return props.draggable ? (
        <DraggableItem id={props.id} type={props.type}>{cardContent}</DraggableItem>
    ) : (
        cardContent
    );
};
