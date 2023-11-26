const imgDirectoriesArray = [
    "/matching-game-images/fruits/apple.png",
    "/matching-game-images/fruits/avocado.png",
    "/matching-game-images/fruits/blueberry.png",
    "/matching-game-images/fruits/cherries.png",
    "/matching-game-images/fruits/grapes.png",
    "/matching-game-images/fruits/lemon.png",
    "/matching-game-images/fruits/orange.png",
    "/matching-game-images/fruits/star-fruit.png",
    "/matching-game-images/fruits/strawberry.png",
    "/matching-game-images/fruits/watermelon.png"
];

const shuffleArray = (myArray:string[]) : string[]=>{
    for(let i=myArray.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [myArray[i],myArray[j]] = [myArray[j],myArray[i]];
    }
    return myArray;
}

export {shuffleArray,imgDirectoriesArray};