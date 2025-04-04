import style from './AddLinkPrompt.module.css'
import { useState } from 'react';
import { AddLinkPromptProps } from '../types/interfaces';
import { addDocument } from '../api/firebaseDb';

const AddLinkPrompt = (props:AddLinkPromptProps) =>{
    const [formData, setFormData] = useState({
        name:"",
        link:"",
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.hideVisibility();
        setFormData({name:"", link:""})
        addDocument(props.type, formData);
    };

    return(
        <div className={`${props.visibility ? '' : style.hidden}`}>
            <div className={style.backDrop} onClick={props.hideVisibility} >
                <div className={style.addLinkCard} onClick={(e) => e.stopPropagation()}>
                    <h2>Add Link</h2>
                    <form className={style.addLinkForm} onSubmit={handleSubmit}>
                        <label className={style.addLinkLabel}>
                            Name
                            <input type="text" name="name" className={style.addLinkInput} value={formData.name} onChange={handleChange} />
                        </label>
                        <label className={style.addLinkLabel}>
                            Link
                            <input type="text" name="link"  className={style.addLinkInput} value={formData.link} onChange={handleChange}/>
                        </label>
                        <button className={style.addLinkButton}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddLinkPrompt;