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
        //Usage of API
        addDocument(props.type, formData);
        console.log("Submitted Data:", formData);
    };

    return(
        <div className={`${props.visibility ? '' : style.hidden}`}>
            <div className={style.backDrop} onClick={props.hideVisibility} >
                <div className={style.addLinkCard} onClick={(e) => e.stopPropagation()}>
                    <h2>Header</h2>
                    <form className={style.addLinkForm} onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label>
                            Link:
                            <input type="text" name="link" value={formData.link} onChange={handleChange}/>
                        </label>
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddLinkPrompt;