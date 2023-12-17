'use client';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
const Square = ({imgSrc,index,choosentwo,setChoosentwo,disabled,setDisabled,check,reset,setReset}:{
    imgSrc:string,
    index:string,
    choosentwo:any,
    setChoosentwo:any,
    disabled:any,
    setDisabled:any,
    check:any,
    reset:any,
    setReset:any
}) => {

    const [open, setOpen]=useState(false);
    const [matched,setMatched] = useState(false);
    const [duration,setDuration] = useState(false);

    const openClose = () => {

        if(choosentwo.first.index == index || choosentwo.second.index == index){
            setOpen(true);
        }
        else if(matched){
            setOpen(true);//Burası hemen update edilmedigi icin oluyor o hata. Eşleştikten snra önce kapanıyor snra tekrar açılıyor.
        }
        else if(!matched){
            setOpen(false);
        }
    }

    const checkIfMatched = () => {
        console.log("disabled",disabled);
        for(let i=0;i<disabled.length;i++) {
            // console.log("disabled[",i,"]==",disabled[i]);
            if(disabled[i] == index ){
                setMatched(true);
                console.log("matched",matched);
            }
        }
        setTimeout(openClose,100);
        
    }
    useEffect(()=>{
        checkIfMatched();
    },[disabled,choosentwo,matched]);
    useEffect(()=>{
        setOpen(false);
        setMatched(false);
        setDuration(true);
        setTimeout(()=>{setDuration(false)},300);

    },[reset]);

    return (
        <Card className='w-auto ratio ratio-1x1' 
        style={{
            cursor:'pointer',
            pointerEvents: matched ? "none":"auto",
            opacity: matched ? 0.5 : 1,
        }}
        onClick={()=>{
            check(imgSrc,index);
        }}
>
            <Card className='w-100 h-100' style={{
                transformOrigin:'center',
                transitionDuration: duration ? '0s' : '1s',
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