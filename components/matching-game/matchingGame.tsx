'use client';
import Heading from "./heading";
import { Container,Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Square from "./square";
import {shuffleArray,imgDirectories} from "./images";
import {io,Socket} from "socket.io-client";

const MatchingGame = ({sendMessage,images,resetImages,socket}:any) => {
    const [reset,setReset] = useState(true);
    const [anyclick, setAnyclick] = useState(false);//herhangi bir square elemanında click event oldu mu?
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
        console.log("Check metodu çalışıyor mu?");
        if(choosentwo.first.imgUrl == null && choosentwo.second.imgUrl == null){
           setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index}});
        }
        else if(choosentwo.second.imgUrl == null && choosentwo.first.imgUrl != null && choosentwo.first.index != index){
            setChoosentwo({...choosentwo,second:{imgUrl:imgUrl,index:index}});
            if(disabled.length >= ((colRowNumbers.colNumber * colRowNumbers.rowNumber)-2)){
                setDisabled((disabled:any) => [...disabled,choosentwo.first.index, index]);
                                 // bu yapiya dikkat, return eklemeyince sikinti yasaniyor.
                                 if(playerturn){
                                    console.log("playerturn");
                                    setScore((prevScore:any) =>{ 
                                        socket.emit("setScore",{
                                            score:{...prevScore,first:prevScore.first+1},
                                            playerturn: "player1"
                                        })
                                        return {...prevScore,first:prevScore.first+1}});
                                }
                                else if(!playerturn) {
                                    console.log("playerturn");

                                    setScore( (prevScore:any) =>{ 
                                        socket.emit("setScore",{
                                            score:{...prevScore,second:prevScore.second+1},
                                            playerturn:"player2"
                                        })                                        
                                        return {...prevScore,second:prevScore.second+1}});}
                
            }
        }
        else if(choosentwo.first.imgUrl != null && choosentwo.second.imgUrl != null){
            if(choosentwo.first.imgUrl == choosentwo.second.imgUrl && choosentwo.first.index != index && choosentwo.second.index != index) {
                setDisabled((disabled:any) => [...disabled,choosentwo.first.index, choosentwo.second.index]);
                setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index},second:{imgUrl:null,index:null}});
                 // bu yapiya dikkat, return eklemeyince sikinti yasaniyor.
                if(playerturn){
                    setScore( (prevScore:any) =>{ 
                        socket.emit("setScore",{
                        score:{...prevScore,first:prevScore.first+1},
                        playerturn:"player1"
                        })
                        return {...prevScore,first:prevScore.first+1}});
                }
                else if(!playerturn) {
                    setScore( (prevScore:any) =>{

                        socket.emit("setScore",{
                        score:{...prevScore,first:prevScore.second+1},
                        playerturn:"player2"
                                }) 
                        return {...prevScore,second:prevScore.second+1}});}
            }
            else if(choosentwo.first.imgUrl != choosentwo.second.imgUrl && choosentwo.first.index != index && choosentwo.second.index != index) {
                setChoosentwo({...choosentwo,first:{imgUrl:imgUrl,index:index},second:{imgUrl:null,index:null}}); 
                socket.emit("setplayerTurn",{
                    playerturn:!playerturn
                });
                setPlayerturn((playerturn:boolean)=>!playerturn)           }
        }
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
        setImageurls(images);
        console.log("images",images);
        console.log("imageurls",imageurls);
    }
    useEffect(()=>{
        console.log("images:",images);
        updateComponents(colRowNumbers);
        setPlayerturn(true);
        setReset(reset=>!reset);
    },[images]);

    useEffect(()=>{
        socket.emit("setchoosentwo",{choosentwo:choosentwo});
        socket.on("choosen",(data:any)=>{
            setChoosentwo(data.choosentwo);
        });
    },[anyclick])

    useEffect(()=>{
        console.log("score");
        socket.on("newScore", (data:any)=>{
            console.log("score",data.score);
            setScore(data.score);
        })
    },[disabled]);

    useEffect(()=>{
        socket.on("playerturn",(data:any)=>{
            setPlayerturn(data.playerturn);
        })
    },[choosentwo]);
    useEffect(()=>{
        console.log("socket",socket);
    },[choosentwo]);
   /* useEffect(()=>{
        console.log("socket",socket);
    },[socket]);*/
    
    /*useEffect(()=>{
        socket.on("choosen",(data)=>{
               console.log("data.choosentwo",data.choosentwo);  
               console.log("choosentwo",choosentwo);  
               console.log("(data.choosentwo != choosentwo",data.choosentwo != choosentwo);  
            if(data.choosentwo != choosentwo){
            setChoosentwo(data.choosentwo);}
        })
    },[choosentwo]);*/

   /* const tryIt = () => {
        socket.emit("setchoosentwo",{choosentwo:choosentwo});
        socket.on("choosen",(data)=>{
            setChoosentwo((prev)=>{
                //setChoosentwo({...choosentwo,first:{imgUrl:null,index:null},second:{imgUrl:null,index:null}
                return {...prev,first:{imgUrl:data.choosentwo.first.imgUrl,index:data.choosentwo.first.index},second:{imgUrl:data.choosentwo.second.imgUrl,index:data.choosentwo.second.index}}
            })
        })
    }*/

    useEffect(()=>{updateComponents(colRowNumbers)},[]);
    useEffect(()=>{
        updateComponents(colRowNumbers);
        setChoosentwo({...choosentwo,first:{imgUrl:null,index:null},second:{imgUrl:null,index:null}});
    },[colRowNumbers.colNumber,colRowNumbers.rowNumber,colRowNumbers,imagetypes.type,reset]);
    return (

                <Container className='d-grid gap-2 col-12 col-md-6 mb-5' onClick={sendMessage}>
                <Row> <Heading setColRowNumbers={setColRowNumbers} colRowNumbers={colRowNumbers} updateComponents={updateComponents} setDisabled={setDisabled}
                playerturn={playerturn} reset = {reset} setReset={setReset}
                score={score} setScore={setScore} setPlayerturn={setPlayerturn} imagetypes={imagetypes} setImagetypes={setImagetypes}
                resetImages={resetImages}
                /> </Row>
                {components.rowComponents && components.rowComponents.map((rowComponent,index1)=>{
                    return ( 
                        <Row key={`${index1} ${colRowNumbers.colNumber} ${colRowNumbers.rowNumber}`}>
                        {components.colComponents.map((colComponent,index2)=>{
                            return (
                                <Col  key={`${index2} ${colRowNumbers.colNumber} ${colRowNumbers.rowNumber}`}>
                                    <Square
                                    anyclick={anyclick}
                                    setAnyclick={setAnyclick}
                                    socket={socket}
                                    key={`${index2} ${colRowNumbers.colNumber} ${colRowNumbers.rowNumber}`}
                                    check={check} setPlayerturn={setPlayerturn}
                                    choosentwo={choosentwo} setChoosentwo={setChoosentwo} 
                                    disabled={disabled} setDisabled={setDisabled}
                                    index={index1+" "+index2} reset={reset} setReset={setReset}
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