import styles from './styles/Square.module.scss';
import { useState,useEffect } from 'react';
const Square = ({x,setX,index,winner,setWinner,all,setAll,reset,setReset}:any) => {

    const [intext,setIntext] = useState("");
    useEffect(() =>{
        setIntext("");

    },[reset]);

    return (
        <div onClick={()=>{
            if(intext == "" && winner=="None"){
                  setIntext(x==true ? "X":"O" );
           setAll((all:any)=>
             {
                if(index == 1){
             return {...all,bir:x==true ? "X":"O"};
             }
                     else if(index == 2){
             return {...all,iki:x==true ? "X":"O"};
             }
                     else if(index == 3){
             return {...all,uc:x==true ? "X":"O"};}
                     else if(index == 4){
             return {...all,dort:x==true ? "X":"O"};}
                     else if(index == 5){
             return {...all,bes:x==true ? "X":"O"};}
                     else if(index == 6){
             return {...all,alti:x==true ? "X":"O"};}
                     else if(index == 7){
             return {...all,yedi:x==true ? "X":"O"};}
                     else if(index == 8){
             return {...all,sekiz:x==true ? "X":"O"};}
             else {
             return {...all,dokuz:x==true ? "X":"O"};
             }
             }
           );
        
           setX((x:any)=>!x);}
     
           }}
             className={styles.square}>
            <span className={styles.textSpan}>{intext}</span>
        </div>
    )
}
export default Square;