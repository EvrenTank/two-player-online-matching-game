'use client';
import Heading from "./heading";
import { Container,Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Square from "./square";
import {shuffleArray,imgDirectoriesArray} from "./images";

const MatchingGame = () => {
    const [choosentwo,setChoosentwo] = useState<{first:any,second:any}>({
        first:{
            imgUrl:null,
            index:null,
            open:false,
        },
        second:{
            imgUrl:null,
            index:null,
            open:false,
        }
    });
    const [disabled,setDisabled] = useState<any>([]);
    

    const check = (imgUrl:string,index:string) => {
        if(choosentwo.first.imgUrl == null && choosentwo.second.imgUrl == null){
           setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index}});
        }
        else if(choosentwo.second.imgUrl == null && choosentwo.first.imgUrl != null){
            setChoosentwo({...choosentwo,second:{imgUrl:imgUrl,index:index}});
        }
        else if(choosentwo.first.imgUrl != null && choosentwo.second.imgUrl != null){
            if(choosentwo.first.imgUrl == choosentwo.second.imgUrl) {
                console.log("sağlama yapıldı");
                setDisabled((disabled:any) => [...disabled,choosentwo.first.index, choosentwo.second.index]);
                console.log("disabled",disabled);
                setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index},second:{imgUrl:null,index:null}});
                console.log("choosentwo",choosentwo.first.imgUrl);
            }
            else {
                setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index},second:{imgUrl:null,index:null}});            }
        }
        console.log("choosentwo==",choosentwo);
    }

    const [colRowNumbers,setColRowNumbers] = useState<{rowNumber:number,colNumber:number}>( {
        rowNumber:2,
        colNumber:3
    });
    const [components,setComponents] = useState<{rowComponents:string[],colComponents:string[]}>(
        {rowComponents:[],
         colComponents:[]});
    const [imageurls,setImageurls] = useState<string[]>([]);
    const updateComponents = (newcolRowNumbers:any) => {

        const rowArray:string[] = [];
        const colArray:string[] = [];

        for(let i=0;i<newcolRowNumbers.rowNumber;i++){
            rowArray.push(`${i}`);
        }
        for(let i=0;i<newcolRowNumbers.colNumber;i++){
            colArray.push(`${i}`);
        }
        setComponents(components => ({...components, rowComponents:rowArray, colComponents:colArray}));
        
        const neededImagesNumber = newcolRowNumbers.rowNumber * newcolRowNumbers.colNumber /2;
        const slicedArray = [...imgDirectoriesArray.slice(0,neededImagesNumber),...imgDirectoriesArray.slice(0,neededImagesNumber)];
        const shuffledArray = shuffleArray(slicedArray);
        setImageurls(shuffledArray);
    }

    useEffect(()=>{
        updateComponents(colRowNumbers);
    },[colRowNumbers.colNumber,colRowNumbers.rowNumber,colRowNumbers]);

    return (

                <Container className='d-grid gap-2 col-12 col-md-6 col-lg-4'>
                <Row> <Heading setColRowNumbers={setColRowNumbers} colRowNumbers={colRowNumbers} /> </Row>
                {components.rowComponents && components.rowComponents.map((rowComponent,index1)=>{
                    return ( 
                        <Row key={`${index1} ${colRowNumbers.colNumber} ${colRowNumbers.rowNumber}`}>
                        {components.colComponents.map((colComponent,index2)=>{
                            return (
                                <Col  key={`${index2} ${colRowNumbers.colNumber} ${colRowNumbers.rowNumber}`}>
                                    <Square
                                    key={`${index2} ${colRowNumbers.colNumber} ${colRowNumbers.rowNumber}`}
                                    check={check}
                                    choosentwo={choosentwo} setChoosentwo={setChoosentwo} 
                                    disabled={disabled} setDisabled={setDisabled}
                                    index={index1+" "+index2} 
                                    imgSrc={imageurls[(index1*colRowNumbers.colNumber)+index2]}/>
                                </Col>
                            )
                        })}
                        </Row>
                        
                    )
                })
                }
                <Row>{choosentwo.first.imgUrl}<br/> {choosentwo.second.imgUrl}</Row>
            </Container>
    )
}
export default MatchingGame;