'use client';
import {Container,Row, Col} from 'react-bootstrap';
import Square from './Square';
import Heading from './Heading';
import { useState } from 'react';

const TTT = ()=> {
    const [x,setX] = useState(true);

    return (
        <Container className='d-grid gap-2 col-12 col-md-6 col-lg-4'>
            <Row> <Heading x={x} /> </Row>
            <Row>
                <Col><Square x={x} setX={setX} /></Col>
                <Col><Square x={x} setX={setX} /></Col>
                <Col><Square x={x} setX={setX} /></Col>
            </Row>
            <Row>
                <Col><Square x={x} setX={setX} /></Col>
                <Col><Square x={x} setX={setX} /></Col>
                <Col><Square x={x} setX={setX} /></Col>
            </Row>
            <Row>
                <Col><Square x={x} setX={setX} /></Col>
                <Col><Square x={x} setX={setX} /></Col>
                <Col><Square x={x} setX={setX} /></Col>
            </Row>
        </Container>
    );
}
export default TTT;