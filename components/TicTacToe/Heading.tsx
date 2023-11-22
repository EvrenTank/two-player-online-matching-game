import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Heading = ({x,winner,setWinner,reset,setReset,setAll,all,setX}:any) => {
    return (
        <Card className="text-center d-flex justify-content-center align-items-center">
            <Card.Header as="h4" className="text-danger">Tic Tac Toe Game</Card.Header>
            <Card.Title>{winner == "None" ? "NO WINNER":winner+" is the winner!" }</Card.Title>
            <Card.Text>Sıradaki Oyuncu:{x ? "X":"O"}</Card.Text>
            <Button className="d-inline" variant="outline-info" size="lg" onClick={()=>{
                setReset( (reset:any)=>!reset);
                setWinner("None");
                setX(true);
                setAll({...all,bir:"empty",
                iki:"empty",
                uc:"empty",
                dort:"empty",
                bes:"empty",
                alti:"empty",
                yedi:"empty",
                sekiz:"empty",
                dokuz:"empty"})
            }}>RESET</Button>
        </Card> 
    );
}

export default Heading;