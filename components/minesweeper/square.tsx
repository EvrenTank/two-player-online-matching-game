import Image from 'next/image';
import styles from './styles/Square.module.scss';
import { useState,useEffect,useRef } from 'react';
import { Card } from 'react-bootstrap';
const Square = ({index,mined,minedsquares}:{
    index:string,
    mined:boolean,
    minedsquares:{rowIndex:number,colIndex:number}[]
}) => {

    const [clicked,setClicked] = useState(false);
    const [leftclicked,setLeftclicked] = useState(false);
    const [number,setNumber] = useState(0);
    
    const handleRightClick = (event:any) => {
        event.preventDefault();
        if(!leftclicked){
            setClicked((prev)=> !prev);
        }
        
    }
    const handleLeftClick = (event:any) => {
        if(!clicked){
            setLeftclicked(true);  
        }
    }
    const countNeighborMines = () => {
        const rowIndex = parseInt(index.split(" ")[0]);
        const colIndex = parseInt(index.split(" ")[1]);
        console.log("rowIndex ",rowIndex," type ",typeof(rowIndex));
        console.log("colIndex",colIndex);
        if(!mined){
            for(let i=0;i<minedsquares.length;i++){
                console.log(minedsquares[i]);
                if(colIndex == minedsquares[i].colIndex && (rowIndex == minedsquares[i].rowIndex-1 || rowIndex == minedsquares[i].rowIndex+1)){
                  setNumber((prev)=>{
                    return prev+1;
                  })
                }
                else if(rowIndex == minedsquares[i].rowIndex && (colIndex == minedsquares[i].colIndex-1 || colIndex == minedsquares[i].colIndex+1)){
                    setNumber((prev)=>{
                      return prev+1;
                    })
                }
                else if((rowIndex == minedsquares[i].rowIndex-1 || rowIndex == minedsquares[i].rowIndex+1 ) && 
                (colIndex == minedsquares[i].colIndex-1 || colIndex == minedsquares[i].colIndex+1)){
                    setNumber((prev)=>{
                        return prev+1;
                      })
                }
        }
    }
}

useEffect(()=>{
    countNeighborMines();
    console.log("number ", number)
},[]);

    return (
        <Card className='w-auto ratio ratio-1x1' 
        onContextMenu={handleRightClick}
        onClick={handleLeftClick}
        style={{
            cursor:'pointer',
        }}
       >
       {(clicked) &&
        <Image className=' w-50 h-auto position-absolute top-50 start-50 translate-middle'
        src={'/minesweeper-images/location.png'} alt='flag' width={50} height={50}></Image>}
       {
        (leftclicked && !mined) &&
         <span className='position-absolute top-50 start-50 translate-middle fw-bold d-flex justify-content-center align-items-center ' >{number}</span> 
       }
       {(leftclicked && mined ) &&
        <Image className=' w-50 h-auto position-absolute top-50 start-50 translate-middle'
        src={'/minesweeper-images/explosion.png'} alt='flag' width={50} height={50}></Image>
       }
        </Card>
    )
}
export default Square;