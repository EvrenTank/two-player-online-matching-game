'use client';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { useState } from 'react';
const Square = ({imgSrc,index,choosentwo,setChoosentwo,disabled,setDisabled,check}:{
    imgSrc:string,
    index:string,
    choosentwo:any,
    setChoosentwo:any,
    disabled:any,
    setDisabled:any,
    check:any
}) => {

    const [open, setOpen]=useState(false);
    const [matched,setMatched] = useState(false);
    const checkIfMatched = () => {
        for(let i=0;i<disabled.length;i++) {
            if(disabled[i] == index ){
                setMatched(true);
            }
        }
    }
    

    return (
        <Card className='w-auto ratio ratio-1x1' 
        style={{
            cursor:'pointer',
            pointerEvents: matched ? "none":"auto",
            opacity: matched ? 0.7 : 1,
        }}
        onClick={()=>{
            setOpen(open => !open);
            check();
            checkIfMatched();
        }}
>
            <Card className='w-100 h-100' style={{
                transformOrigin:'center',
                transitionDuration:'1s',
                transform: !open ? 'rotateY(180deg)' : 'rotateY(0deg)',
                backfaceVisibility:'hidden'
            }} >
                <Card className='w-100 h-100 bg-primary' style={{
                    transformOrigin:'right',
                    transform:'rotateY(360deg)',
                }} ></Card>
                <Image src={imgSrc} alt={`${index}`} fill={true}></Image>
                </Card>
        </Card>

    )
}
export default Square;