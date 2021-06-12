import React, {useState, useEffect, useContext, useImperativeHandle } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Node from './Node'

import { OptionsContext } from '../Context/OptionsContext'

import './Grid.css'

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center'
	},
    grid: props => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.colums}, 1fr)`, 
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
        alignSelf: 'flex-start',
        width: props.colums * 20,
        height: props.rows * 20,
        justifyContent: 'center',
    }),
});

const GridContainer = React.forwardRef((props, ref) => {

    let classes = useStyles(props);
    const { rows, colums } = props;
	const { algorithmIndex, wallIndex } = useContext(OptionsContext);

	var visited = [];
	var path = [];
	const [Grid, setGrid] = useState([]);

	useImperativeHandle(ref, () => ({
		animateAlgorithm,
		reset
	}));

	useEffect(() => {
		initGrid();
	}, []);

	var start = [4, rows / 2];
	var end = [colums - 5, colums / 2];

	const initGrid = () => {
		var grid = [];
		for (let row = 0; row < rows; row++) {
			grid.push([])
			for (let col = 0; col < colums; col++) {
				grid[row].push(createNode(row, col));
			}
		}
		setGrid([...grid]);
	}

	const createNode = (row, col) => {
		return {
			row,
			col,
			isStart: row === start[0] && col === start[1],
			isEnd: row === end[0] && col === end[1],
			isVisited: false,
			isWall: false,
			isPath: false,
			distance: Infinity,
			prevNode: null,
		};
	 };

	 const bfs = () => {

		var location = {
			row: start[0],
			col: start[1],
		};
	
		var grid = Grid;
		var queue = [];
		queue.push(location);
	
		while (queue.length) {
			var currentLocation = queue.shift();
			var row = currentLocation.row;
			var col = currentLocation.col;
			if (row === end[0] && col === end[1]) {
				setGrid(...[grid]);
				getPath(grid);
				return true;
			}
			if (grid[row][col].isVisited === false) {
				grid[row][col].isVisited = true;
				visited.push(grid[row][col]);
			}else {
				continue;
			}
			var neighbors = getNeighbors(grid, row, col);
			for (let neighbor of neighbors) {
				if (grid[neighbor.row][neighbor.col].isVisited !== true) {
					queue.push(neighbor);
					grid[neighbor.row][neighbor.col].prevNode = currentLocation;
				}
			}
		}

		return false;
	};

	const getNeighbors = (grid, row, col) => {
		let neighbors = [];
		if (validNode(grid, row, col - 1)) {
			neighbors.push({
				row: row,
				col: col - 1,
			});
		}
		if (validNode(grid, row, col + 1)) {
			neighbors.push({
				row: row,
				col: col + 1,
			});
		}
		if (validNode(grid, row - 1, col)) {
			neighbors.push({
				row: row - 1,
				col: col,
			});
		}
		if (validNode(grid, row + 1, col)) {
			neighbors.push({
				row: row + 1,
				col: col,
			});
		}
		return neighbors;
	};

	const validNode = (grid, row, col) => {
		var rowLength = grid.length;
		var colLength = grid[0].length;
		if (row < 0 || row >= rowLength || col < 0 || col >= colLength) {
			return false;
		}
		if (grid[row][col].isWall) {
			return false;
		}
		return true;
	};

	const getPath = (grid) => {
		var currentNodeCord = {
			row: end[0],
			col: end[1],
		}
		path.push(currentNodeCord);
		var curRow = currentNodeCord.row;
		var curCol = currentNodeCord.col;
		var prevNodeCord = grid[curRow][curCol].prevNode;
		while (prevNodeCord !== null) {
			currentNodeCord = prevNodeCord;
			path.push(currentNodeCord);
			curRow = currentNodeCord.row;
			curCol = currentNodeCord.col;
			var curNode = grid[curRow][curCol];
			prevNodeCord = curNode.prevNode;
		}
		path.reverse();
	};

	const animateAlgorithm = () => {
		bfs();
		console.log(`Visited length: ${visited.length}`)
		for (let i = 1; i <= visited.length; i++) {
			if (i === visited.length) {
				setTimeout(() => {
					drawPath();
				}, 7 * i);
			} else {
				let nodeCord = visited[i];
				let row = nodeCord.row;
				let col = nodeCord.col;
				setTimeout(() => {
					markVisited(row, col);
				}, 6 * i);	
			}
		}
	};

	const drawPath = () => {
		for (let i = 1; i < path.length - 1; i++) {
			let nodeCord = path[i];
			let row = nodeCord.row;
			let col = nodeCord.col;
			setTimeout(() => {
				markPath(row, col);
			}, 40 * i);
		}
	};

	const markPath = (row, col) => {
		document.getElementById(`node-${row}-${col}`).className = 'node path';
	};

	const markVisited = (row, col) => {
		document.getElementById(`node-${row}-${col}`).className = 'node visited';
	};

	const addRandomWalls = (threshold) => {
		let grid = [...Grid];
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < colums; col++) {
				if (!grid[row][col].isStart && !grid[row][col].isEnd) {
					grid[row][col].isWall = (Math.floor(Math.random() * 10) > threshold);
				}
			}
		}
		setGrid(grid);
	};

	const resetGridColors = () => {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < colums; col++) {
				if (Grid[row][col].isStart !== true && Grid[row][col].isEnd !== true){
					document.getElementById(`node-${row}-${col}`).className = 'node';
				}
			}
		}
	};
	
	const reset = () => {
		visited = [];
		path = [];
		resetGridColors();
		initGrid();
	};

	var GridMap = Grid.map((row, rowIndex) => {
		return (
			<div key={rowIndex}>
				{row.map((node, nodeIndex) => {
					const { row, col, isStart, isEnd, isWall, isPath, isVisited } = node;
					return (
						<Node
							key={`${row}${col}`}
							width={20}
							height={20}
							row={row}
							col={col}
							isStart={isStart}
							isEnd={isEnd}
							isWall={isWall}
							isPath={isPath}
							isVisited={isVisited}
						/> 
					);
				})}
			</div>
		);
	})

    return (
		<>
			<div className={classes.root}>
				<div className={classes.grid}>
					{GridMap}
				</div>
			</div>
			<Button variant="contained" color="primary" onClick={ () => addRandomWalls(6) }>Add Random Walls</Button>
			<Button variant="contained" color="primary" onClick={ () => reset() }>Reset</Button>
		</>
    )
});

export default GridContainer