'use client';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { useState } from 'react';
const Square = ({imgSrc}:{
    imgSrc:string
}) => {

    const [turned, setTurned]=useState(false);

    return (
        <Card className='w-auto ratio ratio-1x1' 
        onClick={()=>{
            setTurned(turned => !turned);
        }}
        style={{
            cursor:'pointer'
        }}>
            <Card className='w-100 h-100' style={{
                transformOrigin:'center',
                transitionDuration:'1s',
                transform: turned ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }} >
                <Card className='w-100 h-100 bg-dark' style={{
                    transformOrigin:'right',
                    transform:'rotateY(360deg)',
                }} ></Card>
                <Image src={imgSrc} alt='image' fill={true}></Image>
                </Card>
        </Card>

    )
}
export default Square;