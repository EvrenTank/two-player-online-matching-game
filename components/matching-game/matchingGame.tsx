'use client';
import Heading from "./heading";
import { Container,Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Square from "./square";
import {shuffleArray,imgDirectories} from "./images";

const MatchingGame = () => {
    const [reset,setReset] = useState(true);
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
    const [playerturn,setPlayerturn] = useState<any>(true);
    const [score,setScore] = useState<{first:number,second:number}>({
        first:0,
        second:0
    })  

    const check = (imgUrl:string,index:string) => {
        if(choosentwo.first.imgUrl == null && choosentwo.second.imgUrl == null){
           setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index}});
        }
        else if(choosentwo.second.imgUrl == null && choosentwo.first.imgUrl != null && choosentwo.first.index != index){
            setChoosentwo({...choosentwo,second:{imgUrl:imgUrl,index:index}});
            //console.log("disabled.length",disabled.length);
            if(disabled.length >= ((colRowNumbers.colNumber * colRowNumbers.rowNumber)-2)){
                //console.log("burası calisiyor");
                setDisabled((disabled:any) => [...disabled,choosentwo.first.index, index]);
                                 // bu yapiya dikkat, return eklemeyince sikinti yasaniyor.
                                 if(playerturn){
                                    setScore( (prevScore:any) =>{ 
                                        return {...prevScore,first:prevScore.first+1}});
                                }
                                else if(!playerturn) {
                                    setScore( (prevScore:any) =>{ 
                                        return {...prevScore,second:prevScore.second+1}});}
                
            }
        }
        else if(choosentwo.first.imgUrl != null && choosentwo.second.imgUrl != null){
            if(choosentwo.first.imgUrl == choosentwo.second.imgUrl && choosentwo.first.index != index && choosentwo.second.index != index) {
                //console.log("sağlama yapıldı");
                setDisabled((disabled:any) => [...disabled,choosentwo.first.index, choosentwo.second.index]);
                //console.log("disabled",disabled);
                setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index},second:{imgUrl:null,index:null}});
                //console.log("choosentwo",choosentwo.first.imgUrl);
                 // bu yapiya dikkat, return eklemeyince sikinti yasaniyor.
                if(playerturn){
                    setScore( (prevScore:any) =>{ 
                        return {...prevScore,first:prevScore.first+1}});
                }
                else if(!playerturn) {
                    setScore( (prevScore:any) =>{ 
                        return {...prevScore,second:prevScore.second+1}});}
            }
            else if(choosentwo.first.imgUrl != choosentwo.second.imgUrl && choosentwo.first.index != index && choosentwo.second.index != index) {
                setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index},second:{imgUrl:null,index:null}}); 
                setPlayerturn((playerturn:boolean)=>!playerturn)           }
        }
        //console.log("choosentwo==",choosentwo);
    }

    const [colRowNumbers,setColRowNumbers] = useState<{rowNumber:number,colNumber:number}>( {
        rowNumber:3,
        colNumber:2
    });
    const [components,setComponents] = useState<{rowComponents:string[],colComponents:string[]}>(
        {rowComponents:[],
         colComponents:[]});
         
    const [imageurls,setImageurls] = useState<string[]>([]);
    const[imagetypes,setImagetypes] = useState<{type:string}>({type:"fruits"});

    // row ve col number degistiginde componentlari ve imagelari tekrar olusturuyor.
    const updateComponents = (newcolRowNumbers:any) => {
        console.log("updateComponents   called");
        console.log("disabled",disabled);
        const rowArray:string[] = [];
        const colArray:string[] = [];
        for(let i=0;i<newcolRowNumbers.rowNumber;i++){
            rowArray.push(`${i}`);
        }
        for(let i=0;i<newcolRowNumbers.colNumber;i++){
            colArray.push(`${i}`);
        }
        setDisabled([]);
        setComponents(components => ({...components, rowComponents:rowArray, colComponents:colArray}));
        const neededImagesNumber = newcolRowNumbers.rowNumber * newcolRowNumbers.colNumber /2;
        const shuffledArray = shuffleArray(imgDirectories,imagetypes.type,neededImagesNumber);
        setImageurls(shuffledArray);
    }

    useEffect(()=>{
        updateComponents(colRowNumbers);
        setChoosentwo({...choosentwo,first:{imgUrl:null,index:null},second:{imgUrl:null,index:null}});
    },[colRowNumbers.colNumber,colRowNumbers.rowNumber,colRowNumbers,imagetypes.type,reset]);
    return (

                <Container className='d-grid gap-2 col-12 col-md-6 col-lg-4'>
                <Row> <Heading setColRowNumbers={setColRowNumbers} colRowNumbers={colRowNumbers} updateComponents={updateComponents} setDisabled={setDisabled}
                playerturn={playerturn} reset = {reset} setReset={setReset}
                score={score} setScore={setScore} setPlayerturn={setPlayerturn} imagetypes={imagetypes} setImagetypes={setImagetypes}
                /> </Row>
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
            </Container>
    )
}
export default MatchingGame;