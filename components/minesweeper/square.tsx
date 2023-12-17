import styles from './styles/Square.module.scss';
import { useState,useEffect } from 'react';
import { Card } from 'react-bootstrap';
const Square = ({index}:{
    index:string
}) => {

 

    return (
        <Card className='w-auto ratio ratio-1x1' 
        style={{
            cursor:'pointer',
          
        }}
>

        </Card>
    )
}
export default Square;