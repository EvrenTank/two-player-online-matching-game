'use client';
import {Container,Row, Col} from 'react-bootstrap';
import Square from './square';
import Heading from './heading';
import { useState,useEffect } from 'react';

const MineSweeper = ()=> {
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
                                return (
                                    <Col key={`${index2}`} >
                                        <Square index={`${index1} ${index2}`}></Square>
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