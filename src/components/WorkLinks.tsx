import style from './WorkLinks.module.css';
import AddLinkButton from './AddLinkButton';

const WorkLinks = () => {
    return(
        <div className={style.workLinksCard}>
            Cosas
            <AddLinkButton/>
        </div>
    )
}

export default WorkLinks;