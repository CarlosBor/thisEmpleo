import style from './AddLinkPrompt.module.css'
import { useDispatch } from 'react-redux';
import { toggle } from '../store';
import { useState } from 'react';

const AddLinkPrompt = () =>{
    const [formData, setFormData] = useState({
        name:"",
        link:"",
    });
    const dispatch = useDispatch();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };
    const handleToggle = (e: React.FormEvent<HTMLDivElement>) =>{
        if(e.target === e.currentTarget){
            dispatch(toggle())
        }
    }
    return(
        <div className={style.backDrop} onClick={handleToggle}>
            <div className={style.addLinkCard}>
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
    )
}

export default AddLinkPrompt;