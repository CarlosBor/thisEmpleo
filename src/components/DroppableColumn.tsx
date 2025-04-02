import { useDrop } from 'react-dnd';
import { moveDocument } from '../api/firebaseDb';
import { DropItem, DroppableColumnProps } from '../types/interfaces';

const DroppableColumn: React.FC<DroppableColumnProps> = ({ type, children }) => {
    const handleDrop = (item: DropItem, to: string) => {
        if (item.from !== to) {
            moveDocument(item.from, to, item.id);
        } else {
            console.log(`❌ Card ${item.id} was dropped in the same column (${to}), no move needed.`);
        }
    };

    const [, drop] = useDrop(() => ({
        accept: "JOB_ITEM",
        drop: (item: DropItem) => handleDrop(item, type),
    }));
    // @ts-ignore-warnings
    return <div ref={drop}>{children}</div>;
}

export default DroppableColumn;
