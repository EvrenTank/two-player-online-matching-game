import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Heading = ({x}:any) => {
    return (
        <Card className="text-center d-flex">
            <Card.Header as="h4" className="text-center text-danger">Tic Tac Toe Game</Card.Header>
            <Card.Title>NO WINNER</Card.Title>
            <Card.Text>Sıradaki Oyuncu:{x ? "X":"O"}</Card.Text>
            <Button className="d-inline w-25" variant="outline-info" size="lg">RESET</Button>
        </Card>
    );
}

export default Heading;