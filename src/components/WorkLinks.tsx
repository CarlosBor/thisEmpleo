import style from './WorkLinks.module.css';
import AddLinkButton from './AddLinkButton';

const WorkLinks = () => {
    return(
        <div className={style.workLinksCard}>
            Aqui irian cosas
            <AddLinkButton
                type="searchLinks"
            />
        </div>
    )
}

export default WorkLinks;