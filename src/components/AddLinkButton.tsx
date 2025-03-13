import style from './AddLinkButton.module.css';
import { useDispatch } from 'react-redux';
import { toggle } from '../store';

const AddLinkButton = () =>{
    const dispatch = useDispatch();
    const handleToggle = () =>{
        dispatch(toggle())
    }
    return(
        <div className={style.addLinkButton} onClick={handleToggle}>
            <span>+</span>
        </div>
    )
}

export default AddLinkButton;