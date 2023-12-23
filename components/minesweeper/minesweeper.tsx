'use client';
import {Container,Row, Col} from 'react-bootstrap';
import Square from './square';
import Heading from './heading';
import { useState,useEffect } from 'react';

const MineSweeper = ()=> {

    const [minedsquares,setMinedsquares] = useState<{rowIndex:number,colIndex:number}[]>([]);

    const [colRowNumbers,setColRowNumbers] = useState<{rowNumber:number,colNumber:number}>( {
        rowNumber:10,
        colNumber:7
    });
    const [components,setComponents] = useState<{rowComponents:string[],colComponents:string[]}>(
        {rowComponents:[],
         colComponents:[]});
    const updateComponents = (newcolRowNumbers:{colNumber:number,rowNumber:number}) => {
        const rowArray:string[] = [];
        const colArray:string[] = [];
        for(let i=0;i<newcolRowNumbers.rowNumber;i++){
            rowArray.push(`${i}`);
        }
        for(let i=0;i<newcolRowNumbers.colNumber;i++){
            colArray.push(`${i}`);
        } 
        setComponents({...components,rowComponents:rowArray,colComponents:colArray});
    };

     useEffect(()=>{
        updateComponents(colRowNumbers);
     },[colRowNumbers.rowNumber,colRowNumbers.colNumber]);


     const placeMines = () => {
        const minedIndexes:{rowIndex:number,colIndex:number}[] = [];
        for(let i = 0; i < 100;i++)
        {
            const index1 = Math.floor(Math.random()*colRowNumbers.rowNumber);
            const index2 = Math.floor(Math.random()*colRowNumbers.colNumber);
            
            const minedindex:{rowIndex:number,colIndex:number} = {rowIndex:index1,colIndex:index2};

            if(minedIndexes.some(square => square.rowIndex === index1 && square.colIndex === index2) === false){
                minedIndexes.push(minedindex);
                   
            }
            
                if(minedIndexes.length === 20){
                    console.log("minedIndexes",minedIndexes);
                    break;
                }
        }
        setMinedsquares((prev)=>{
            return minedIndexes;
        });
        console.log("minedsquares",minedsquares);

     };
     useEffect(()=>{
        placeMines();
     },[]);
     useEffect(()=>{
        console.log("minedsquares",minedsquares);
     },[minedsquares]);

    return (
        <Container className='d-grid gap-2 col-12 col-md-6 col-lg-4'>
            <Row> 
              <Heading 
                colRowNumbers={colRowNumbers} 
                setColRowNumbers={setColRowNumbers} 
                updateComponents={updateComponents} /> 
            </Row>
            {components.rowComponents.map((rowComponent,index1)=>{
                return (
                    <Row key={`${index1}`}>
                        {  
                            components.colComponents.map((colComponent,index2)=>{
                                const mined = minedsquares.some(square => square.rowIndex === index1 && square.colIndex === index2);                                return (
                                    <Col key={`${index2}`} >
                                        <Square index={`${index1} ${index2}`} mined={mined} minedsquares={minedsquares} ></Square>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                )
            })}
          
        </Container>
    );
}
export default MineSweeper;