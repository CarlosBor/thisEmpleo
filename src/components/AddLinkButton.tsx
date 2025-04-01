import style from './AddLinkButton.module.css';
import { useState } from 'react';
import { AddLinkProps } from '../types/interfaces';
import AddLinkPrompt from './AddLinkPrompt'

const AddLinkButton = (props:AddLinkProps) =>{
    const [showPrompt, setShowPrompt] = useState(false)

    const hidePrompt = () =>{
        setShowPrompt(false);
    }
    const displayPrompt = () =>{
        setShowPrompt(true);
    }

    return(
        <div className={style.addLinkButton}>
            <AddLinkPrompt
                type={props.type}
                visibility={showPrompt}
                hideVisibility={hidePrompt}
            />
            <span onClick={displayPrompt} className={style.addButton}>
                <span className={style.buttonText}>+ Add</span>
            </span>
        </div>
    )
}

export default AddLinkButton;