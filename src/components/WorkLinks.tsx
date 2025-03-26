import style from './WorkLinks.module.css';
import AddLinkButton from './AddLinkButton';
import { AddLinkProps } from './../types/interfaces'
import { ColumnCard } from './ColumnCard';

const WorkLinks = (props:AddLinkProps) => {
    return(
        <div className={style.workLinksCard}>
            {Object.keys(props.data).length > 0 ? props.data.map((element:any)=>{
                return(
                    <ColumnCard
                        key={element.id}
                        id={element.id}
                        link={element.link}
                        name={element.name}
                        type={element.type}
                    />
                )
            }): null}
            <AddLinkButton
                type={props.type}
                data={props.data}
            />
        </div>
    )
}

export default WorkLinks;