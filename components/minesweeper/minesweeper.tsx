'use client';
import {Container,Row, Col} from 'react-bootstrap';
import Square from './square';
import Heading from './heading';
import { useState,useEffect } from 'react';

const MineSweeper = ()=> {

    const [allsituation,setAllSituation] = useState<{
        index:string,
        mined:string,
        neighborminenumber:number,
        isleftclicked:boolean,
        isrightclicked:boolean
       }[]>([]);

    const [minedsquares,setMinedsquares] = useState<{rowIndex:number,colIndex:number}[]>([]);
    const [flagsNumber,setFlagsNumber] = useState(20);
    const [msk,setMsk] = useState(false); //msk: mined square clicked bunu game over icin de kullanabilirim.
    const [reset,setReset] = useState(false); // true veya false olmasi onemsiz, bunu dependency olarak ekleyecegim.
    
    const [openedsquares,setOpenedsquares] = useState<string[]>([]);

    const [colRowNumbers,setColRowNumbers] = useState<{rowNumber:number,colNumber:number}>( {
        rowNumber:10,
        colNumber:7
    });
    const [components,setComponents] = useState<{rowComponents:string[],colComponents:string[]}>(
        {rowComponents:[],
         colComponents:[]});

    const resetGame = () => {
        setOpenedsquares([]);
        setFlagsNumber(20);
        setMsk(false);
        setMinedsquares([]);
        setReset((reset:boolean) => !reset);
        placeMines();
    };  

    const updateComponents = (newcolRowNumbers:{colNumber:number,rowNumber:number}) => {
        const rowArray:string[] = [];
        const colArray:string[] = [];
        for(let i=0;i<newcolRowNumbers.rowNumber;i++){
            rowArray.push(`${i}`);
        }
        for(let i=0;i<newcolRowNumbers.colNumber;i++){
            colArray.push(`${i}`);
        } 
        setComponents({rowComponents:rowArray,colComponents:colArray});
    };

     useEffect(()=>{
        updateComponents(colRowNumbers);
     },[colRowNumbers.rowNumber,colRowNumbers.colNumber]);


     const placeMines = () => {
        const minedIndexes:{rowIndex:number,colIndex:number}[] = [];
        for(let i = 0; i < 1000;i++)
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
                updateComponents={updateComponents}
                flagsNumber={flagsNumber}
                resetGame={resetGame}
                msk={msk} /> 
            </Row>
            {components.rowComponents.map((rowComponent,index1)=>{
                return (
                    <Row key={`${index1}`}>
                        {  
                            components.colComponents.map((colComponent,index2)=>{
                                const mined = minedsquares.some(square => square.rowIndex === index1 && square.colIndex === index2);                                return (
                                    <Col key={`${index2}`} >
                                        <Square index={`${index1} ${index2}`} mined={mined} minedsquares={minedsquares} 
                                        flagsNumber={flagsNumber} setFlagsNumber={setFlagsNumber}
                                        openedsquares={openedsquares} setOpenedsquares={setOpenedsquares}
                                        msk={msk} setMsk={setMsk} reset={reset}
                                        colRowNumbers={colRowNumbers}></Square>
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