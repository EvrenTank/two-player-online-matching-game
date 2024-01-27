'use client';
import {Container,Row, Col} from 'react-bootstrap';
import Square from './Square';
import Heading from './Heading';
import { useState,useEffect } from 'react';

const TTT = ()=> {
    const [x,setX] = useState(true);
    const [reset,setReset] = useState(false);
    const [lines,setLines] = useState([
        ["bir","iki","uc"],
        ["bir","dort","yedi"],
        ["bir","bes","dokuz"],
        ["dort","bes","alti"],
        ["yedi","sekiz","dokuz"],
        ["iki","bes","sekiz"],
        ["uc","alti","dokuz"],
        ["uc","bes","yedi"]
        ] )
        const [all,setAll] =  useState<any>({
          bir:"empty",
          iki:"empty",
          uc:"empty",
          dort:"empty",
          bes:"empty",
          alti:"empty",
          yedi:"empty",
          sekiz:"empty",
          dokuz:"empty",
        });
    const [winner, setWinner] = useState("None");
    const seeWinner = () => {
        for(let line of lines){
          const [key1,key2,key3] = line;
          if( (all[key1] == all[key2]) && (all[key1] == all[key3]) && all[key1] == "X" ){
          setWinner("X");
          }
          if( (all[key1] == all[key2]) && (all[key1] == all[key3]) && all[key1] == "O" ){
          setWinner("O");
          
          }
        }

    }
        useEffect(()=>{
        seeWinner();
        },[x]);
      

    return (
        <Container className='d-grid gap-2 col-12 col-md-6 col-lg-4'>
            <Row> <Heading x={x} winner={winner}  setWinner={setWinner} reset={reset} setReset={setReset} setX={setX} setAll={setAll} all={all} /> </Row>
            <Row>
                <Col><Square x={x} setX={setX} index={1} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
                <Col><Square x={x} setX={setX} index={2} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
                <Col><Square x={x} setX={setX} index={3} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
            </Row>
            <Row>
                <Col><Square x={x} setX={setX} index={4} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
                <Col><Square x={x} setX={setX} index={5} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
                <Col><Square x={x} setX={setX} index={6} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
            </Row>
            <Row>
                <Col><Square x={x} setX={setX} index={7} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
                <Col><Square x={x} setX={setX} index={8} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
                <Col><Square x={x} setX={setX} index={9} reset={reset} setReset={setReset} setAll={setAll} winner={winner} /></Col>
            </Row>
        </Container>
    );
}
export default TTT;