import { useDrop } from 'react-dnd';
import { moveDocument } from '../api/firebaseDb';

function DroppableColumn({ type, children }) {

    const handleDrop = (item, to) => {
        if (item.from !== to) {
            moveDocument(item.from, to, item.id); // Call Firebase function
        } else {
            console.log(`❌ Card ${item.id} was dropped in the same column (${to}), no move needed.`);
        }
    };

  const [, drop] = useDrop(() => ({
    accept: "JOB_ITEM",
    drop: (item) => handleDrop(item, type),
  }));

  return <div ref={drop}>{children}</div>;
}

export default DroppableColumn;