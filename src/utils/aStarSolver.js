// Implement A* algorithm to solve 8-puzzle
const MaxHeap = require('heap-js').MaxHeap;

class Node {
    constructor(state, parent, action, pathCost) {
        this.state = state;
        this.parent = parent;
        this.action = action;
        this.pathCost = pathCost;
    }
}

function swap(state, i1, j1, i2, j2) {
    let newState = JSON.parse(JSON.stringify(state));
    let temp = newState[i1][j1];
    newState[i1][j1] = newState[i2][j2];
    newState[i2][j2] = temp;
    return newState;
}

function getEmptyTilePosition(state) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] === null) {
                return [i, j];
            }
        }
    }
}

function getChildren(node) {
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let children = [];
    let [i, j] = getEmptyTilePosition(node.state);

    directions.forEach(([di, dj]) => {
        let ni = i + di, nj = j + dj;
        if (ni >= 0 && ni < 3 && nj >= 0 && nj < 3) {
            children.push(new Node(swap(node.state, i, j, ni, nj), node, null, node.pathCost + 1));
        }
    });

    return children;
}

function heuristic(state) {
    let goal = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, null]
    ];

    let cost = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] !== null) {
                for (let ii = 0; ii < 3; ii++) {
                    for (let jj = 0; jj < 3; jj++) {
                        if (goal[ii][jj] === state[i][j]) {
                            cost += Math.abs(i - ii) + Math.abs(j - jj);
                        }
                    }
                }
            }
        }
    }
    return cost;
}

function getNodeFromHeap(node, heap) {
    return heap.toArray().find(item => JSON.stringify(item.state) === JSON.stringify(node.state));
}

function aStarSearch(start) {
    let openList = new MaxHeap([], (a, b) => a.pathCost + heuristic(a.state) - (b.pathCost + heuristic(b.state)));
    let closedList = [];

    openList.push(start);

    while (!openList.isEmpty()) {
        let currentNode = openList.pop();
        closedList.push(currentNode);

        if (heuristic(currentNode.state) === 0) {  // Goal test
            return currentNode;
        }

        let children = getChildren(currentNode);
        for (let i = 0; i < children.length; i++) {
            if (!closedList.find(closedNode => JSON.stringify(closedNode.state) === JSON.stringify(children[i].state))) {
                let existingNode = getNodeFromHeap(children[i], openList);
                if (!existingNode) {
                    openList.push(children[i]);
                } else {  // child is in openList
                    if (children[i].pathCost < existingNode.pathCost) {
                        openList.remove(existingNode);
                        openList.push(children[i]);
                    }
                }
            }
        }
    }
}
