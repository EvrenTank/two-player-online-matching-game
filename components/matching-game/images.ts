const imgDirectories:{fruits:string[],sports:string[],flags:string[],animals:string[]} = {
    fruits: [
        "/matching-game-images/fruits/apple.png",
        "/matching-game-images/fruits/avocado.png",
        "/matching-game-images/fruits/blueberry.png",
        "/matching-game-images/fruits/cherries.png",
        "/matching-game-images/fruits/grapes.png",
        "/matching-game-images/fruits/lemon.png",
        "/matching-game-images/fruits/orange.png",
        "/matching-game-images/fruits/star-fruit.png",
        "/matching-game-images/fruits/strawberry.png",
        "/matching-game-images/fruits/watermelon.png",
        "/matching-game-images/fruits/passion-fruit.png",
        "/matching-game-images/fruits/apricot.png",
        "/matching-game-images/fruits/peach.png",
        "/matching-game-images/fruits/melon.png",
        "/matching-game-images/fruits/pear.png",
        "/matching-game-images/fruits/tomato.png",
        "/matching-game-images/fruits/persimmon.png",
    ],
    sports:[
        "/matching-game-images/sports/american-football.png",
        "/matching-game-images/sports/american-football-player.png",
        "/matching-game-images/sports/ball.png",
        "/matching-game-images/sports/baseball.png",
        "/matching-game-images/sports/basketball.png",
        "/matching-game-images/sports/basketball-jersey.png",
        "/matching-game-images/sports/dumbbell.png",
        "/matching-game-images/sports/floorball.png",
        "/matching-game-images/sports/football.png",
        "/matching-game-images/sports/football-field.png",
        "/matching-game-images/sports/football-jersey.png",
        "/matching-game-images/sports/golf.png",
        "/matching-game-images/sports/jersey.png",
        "/matching-game-images/sports/pool.png",
        "/matching-game-images/sports/runningman.png",
        "/matching-game-images/sports/swimming.png",
        "/matching-game-images/sports/tennis-ball.png",
        "/matching-game-images/sports/tennis-racket.png",
        "/matching-game-images/sports/volleyball.png",

    ],
    flags:[
        "/matching-game-images/flags/turkey.png",
        "/matching-game-images/flags/belgium.png",
        "/matching-game-images/flags/brazil.png",
        "/matching-game-images/flags/german.png",
        "/matching-game-images/flags/japan.png",
        "/matching-game-images/flags/mexico.png",
        "/matching-game-images/flags/netherlands.png",
        "/matching-game-images/flags/portugal.png",
        "/matching-game-images/flags/russia.png",
        "/matching-game-images/flags/singapore.png",
        "/matching-game-images/flags/southafrica.png",
        "/matching-game-images/flags/sweden.png",
        "/matching-game-images/flags/switzerland.png",
        "/matching-game-images/flags/thailand.png",
        "/matching-game-images/flags/usa.png",
    ],
    animals:[
        "/matching-game-images/animals/bear.png",
        "/matching-game-images/animals/bee.png",
        "/matching-game-images/animals/cat.png",
        "/matching-game-images/animals/chick.png",
        "/matching-game-images/animals/cow.png",
        "/matching-game-images/animals/crab.png",
        "/matching-game-images/animals/dog.png",
        "/matching-game-images/animals/dolphin.png",
        "/matching-game-images/animals/eagle.png",
        "/matching-game-images/animals/fox.png",
        "/matching-game-images/animals/frog.png",
        "/matching-game-images/animals/hen.png",
        "/matching-game-images/animals/lion.png",
        "/matching-game-images/animals/owl.png",
        "/matching-game-images/animals/panda.png",
        "/matching-game-images/animals/parrot.png",
        "/matching-game-images/animals/tiger.png",
        "/matching-game-images/animals/turtle.png",
        "/matching-game-images/animals/whale.png",

    ],
};

const shuffleArray = (myfirstArray:{fruits:string[],flags:string[],animals:string[],sports:string[],},imagetypes:string,neededImagesNumber:number) : string[]=>{
    var myArray = myfirstArray.fruits;
    if(imagetypes == "sports"){
         myArray = myfirstArray.sports;
    }
    else if(imagetypes == "flags"){
         myArray = myfirstArray.flags;
    }
    else if(imagetypes == "animals"){
         myArray = myfirstArray.animals;

    }
    for(let i=myArray.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [myArray[i],myArray[j]] = [myArray[j],myArray[i]];
    }
    const firstShuffle = [...myArray.slice(0,neededImagesNumber),...myArray.slice(0,neededImagesNumber)];
    for(let i=firstShuffle.length-1;i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [firstShuffle[i],firstShuffle[j]] = [firstShuffle[j],firstShuffle[i]];
    }   
    return firstShuffle;
}

export {shuffleArray,imgDirectories};