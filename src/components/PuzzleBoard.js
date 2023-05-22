import React, { useState, useEffect } from 'react';
import Tile from './Tile';

const PuzzleBoard = () => {
    const [puzzle, setPuzzle] = useState([]);

    useEffect(() => {
        const initialPuzzle = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, null]
        ];
        setPuzzle(initialPuzzle);
    }, []);

    const findEmpty = (puzzle) => {
        for(let i = 0; i < puzzle.length; i++) {
            for(let j = 0; j < puzzle[i].length; j++) {
                if(puzzle[i][j] === null) {
                    return {i, j};
                }
            }
        }
    }

    const handleClick = (i, j) => {
        const empty = findEmpty(puzzle);
        if(Math.abs(i - empty.i) + Math.abs(j - empty.j) === 1) {
            const newPuzzle = JSON.parse(JSON.stringify(puzzle)); // Create a deep copy
            newPuzzle[i][j] = null;
            newPuzzle[empty.i][empty.j] = puzzle[i][j];
            setPuzzle(newPuzzle);
        }
    }

    return (
        <div className='puzzle'>
            {puzzle.map((row, i) =>
                row.map((number, j) => (
                    <Tile key={`${i}-${j}`} number={number} onClick={() => handleClick(i, j)} />
                ))
            )}
        </div>
    );    
};

export default PuzzleBoard;
