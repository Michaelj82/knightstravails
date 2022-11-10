//board for knights travails
const board = [[0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0]]

//format is y,x


//knightMoves class
let knightMoves = class{
    constructor(origin){
        //origin coordinate point, its possible movement, and father node
        this.origin = origin;
        this.forwardRight = null;
        this.forwardLeft = null;
        this.rightForward = null;
        this.rightBackward = null;
        this.leftForward = null;
        this.leftBackward = null;
        this.backwardRight = null;
        this.backwardLeft = null;
        this.father = null;
    }
    //function to find valid points
    validMoves(){
        //list of traversable points
        let valid = [[this.origin[0]+2, this.origin[1]-1], [this.origin[0]+2, this.origin[1]+1],
                     [this.origin[0]-2, this.origin[1]-1], [this.origin[0]-2, this.origin[1]+1],
                     [this.origin[0]+1, this.origin[1]-2], [this.origin[0]-1, this.origin[1]-2],
                     [this.origin[0]+1, this.origin[1]+2], [this.origin[0]-1, this.origin[1]+2],]

        //if it has a father, make it so that is not a valid point (so that the program doesnt loop back to father)
        if(this.father){
            for (let i = 0; i < valid.length; i++){
                if (JSON.stringify(this.father.origin) === JSON.stringify(valid[i])){
                    valid[i] = [-1,-1]
                }
            }
        }


        //setting the children points
        //If coordinate's minimum value >=0 and Maximum value <= 7, set to new knightMovesfunction with point, else, set to null
        this.forwardRight = ((Math.min(...valid[3]) >= 0) && (Math.max(...valid[3]) <= 7) ? (new knightMoves(valid[3])) : null);
        this.forwardLeft = ((Math.min(...valid[2]) >= 0) && (Math.max(...valid[2]) <= 7) ? (new knightMoves(valid[2])) : null);
        this.rightForward = ((Math.min(...valid[4]) >= 0) && (Math.max(...valid[4]) <= 7) ? (new knightMoves(valid[4])) : null);
        this.rightBackward = ((Math.min(...valid[6]) >= 0) && (Math.max(...valid[6]) <= 7) ? (new knightMoves(valid[6])) : null);
        this.leftForward = ((Math.min(...valid[5]) >= 0) && (Math.max(...valid[5]) <= 7) ? (new knightMoves(valid[5])) : null);
        this.leftBackward = ((Math.min(...valid[7]) >= 0) && (Math.max(...valid[7]) <= 7) ? (new knightMoves(valid[7])) : null);
        this.backwardRight = ((Math.min(...valid[1]) >= 0) && (Math.max(...valid[1]) <= 7) ? (new knightMoves(valid[1])) : null);
        this.backwardLeft = ((Math.min(...valid[0]) >= 0) && (Math.max(...valid[0]) <= 7) ? (new knightMoves(valid[0])) : null);



}
}

//basic function for setting up final path array
function fatherPath(currentNode, outputArray){
    if (currentNode.father !== null){
        outputArray.push(currentNode.father.origin)
        fatherPath(currentNode.father, outputArray)
    }else{
        return
    }
}


//BFS algorithm
let BreadthFirstSearch = (rootNode, searchValue) => {

    let queue = [];
    let path = [];
    //push value to top of queue
    queue.push(rootNode)

    while(queue.length > 0){

        //front of queue
        let currentNode = queue[0];
        //make its valid moves
        currentNode.validMoves()

        //list of possible children for for loop
        let children = [currentNode.forwardRight,  currentNode.forwardLeft, currentNode.rightForward, currentNode.rightBackward, 
            currentNode.leftForward, currentNode.leftBackward,  currentNode.backwardRight, currentNode.backwardLeft]

        //if the current's origin is equal to the searchValue
        if (JSON.stringify(currentNode.origin) == JSON.stringify(searchValue)){
            console.log('Found')
            //format path to this node
            fatherPath(currentNode, path)
            path.unshift(currentNode.origin)
            path.reverse()
            return path;
        }
        //else go in all the currentNode's chidren
        for (let i = 0; i < children.length; i++){
            //if it is a valid movement point
            if (children[i] !== null){
                //make its father this node
                children[i].father = currentNode
                //put in queue 
                queue.push(children[i]);
            }
        }
        //get rid of currentNode from queue
        queue.shift()




    }


};

let knight = new knightMoves([0,0])

let solution = BreadthFirstSearch(knight, [20,2])

console.log(solution)