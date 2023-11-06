import styles from './styles/Square.module.scss';
import { useState } from 'react';
const Square = ({x,setX}:any) => {

    const [intext,setIntext] = useState("");

    return (
        <div onClick={()=>{
            if(intext == ""){
                setX((x:any)=> !x);
                setIntext(x ? "X":"O");
            }


        }}
             className={styles.square}>
            <span className={styles.textSpan}>{intext}</span>
        </div>
    )
}
export default Square;