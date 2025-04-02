import { useDrag } from "react-dnd";
import style from './DraggableItem.module.css';

const DraggableItem = ({ id, type, children }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "JOB_ITEM",
        item: { id, from: type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className={`${style.draggableItem} ${isDragging ? style.dragging : ""}`}>
            {children}
        </div>
    );
};

export default DraggableItem;
