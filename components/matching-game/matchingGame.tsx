'use client';
import Heading from "./heading";
import { Container,Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Square from "./square";

const MatchingGame = () => {

    const [colRowNumbers,setColRowNumbers] = useState<{rowNumber:number,colNumber:number}>( {
        rowNumber:2,
        colNumber:3
    });
    const [components,setComponents] = useState<{rowComponents:string[],colComponents:string[]}>(
        {rowComponents:[],
         colComponents:[]});

    const updateComponents = () => {
        const rowArray:string[] = [];
        const colArray:string[] = [];
        for(let i=0;i<colRowNumbers.rowNumber;i++){
            rowArray.push(`row ${i}`);
        }
        for(let i=0;i<colRowNumbers.colNumber;i++){
            colArray.push(`col ${i}`);
        }
        setComponents({...components, rowComponents:rowArray, colComponents:colArray});  
    }

    useEffect(()=>{
        updateComponents();
    },[colRowNumbers]);

    return (

                <Container className='d-grid gap-2 col-12 col-md-6 col-lg-4'>
                <Row> <Heading setColRowNumbers={setColRowNumbers} colRowNumbers={colRowNumbers} /> </Row>
                {components.rowComponents.map((rowComponent,index)=>{
                    return (
                        <Row key={index}>
                        {components.colComponents.map((colComponent,index)=>{
                            return (
                                <Col key={index}>
                                    <Square imgSrc="/matching-game-images/fruits/lemon.png"/>
                                </Col>
                            )
                        })}
                        </Row>
                        
                    )
                })
                }
            </Container>
    )
}
export default MatchingGame;