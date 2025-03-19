import style from './WorkLinks.module.css';
import AddLinkButton from './AddLinkButton';
import { AddLinkProps } from './../types/interfaces'

const WorkLinks = (props:AddLinkProps) => {
    return(
        <div className={style.workLinksCard}>
            Aqui irian cosas
            <AddLinkButton
                type={props.type}
            />
        </div>
    )
}

export default WorkLinks;