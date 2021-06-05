import React, {useState, useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import Node from './Node'

import './Grid.css'

const useStyles = makeStyles({
    root: props => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.colums}, 1fr)`, 
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
        alignSelf: 'flex-start',
        width: props.colums * 40,
        height: props.rows * 40,
        justifyContent: 'center',
    }),
});

const setWall = (grid, col, row) => {
	grid[col][row].isWall = true;
};

const setWalls = (grid, walls) => {
	for (let i = 0; i < walls.length; i++) {
		let wall = walls[i];
		setWall(grid, wall[0], wall[1]);
	}
};

function Grid(props) {

    let classes = useStyles(props);
    const { rows, colums } = props;

	const [Grid, setGrid] = useState([]);
	const [Path, setPath] = useState([]);
	const [Visited, setVisited] = useState([]);

	useEffect(() => {
		initGrid();
	}, []);

	var start = [colums / 4, 2];
	var end = [colums / 2, rows - 3];

	const initGrid = () => {
		var grid = [];
		for (let row = 0; row < rows; row++) {
			grid.push([])
			for (let col = 0; col < colums; col++) {
				grid[row].push(createNode(col, row));
			}
		}
		bfs(grid);
		setGrid(grid);
	}

	const createNode = (col, row) => {
		return {
			col,
			row,
			isStart: col === start[0] && row === start[1],
			isEnd: col === end[0] && row === end[1],
			isVisited: false,
			isWall: false,
			isPath: false,
			distance: Infinity,
			prevNode: null,
		};
	 }

	 const bfs = (grid) => {

		var location = {
			row: start[0],
			col: start[1],
		};
	
		var queue = [];
		var visited = [];
		queue.push(location);
	
		while (queue.length) {
			var currentLocation = queue.shift();
			var row = currentLocation.row;
			var col = currentLocation.col;
			if (row === end[0] && col === end[1]) {
				setVisited(visited);
				getPath(grid);
				return currentLocation;
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
		var path = [];
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
			var curRow = currentNodeCord.row;
			var curCol = currentNodeCord.col;
			var curNode = grid[curRow][curCol];
			prevNodeCord = curNode.prevNode;
		}
		
		setPath(path.reverse());
	};

	const animateAlgorithm = () => {
		console.log(Visited)
		for (let i = 1; i < Visited.length - 1; i++) {
			let nodeCord = Visited[i];
			let row = nodeCord.row;
			let col = nodeCord.col;
			setTimeout(() => {
				markVisited(row, col);
			}, 5 * i);
		}
		drawPath();
	};

	const drawPath = () => {
		for (let i = 1; i < Path.length - 1; i++) {
			let nodeCord = Path[i];
			let row = nodeCord.row;
			let col = nodeCord.col;
			setTimeout(() => {
				markPath(row, col);
			}, 40 * i);
		}
	};

	const markPath = (row, col) => {
		console.log(`row: ${row}, col: ${col}`)
		document.getElementById(`node-${row}-${col}`).className = 'node path';
	};

	const markVisited = (row, col) => {
		document.getElementById(`node-${row}-${col}`).className = 'node visited';
	};

	var GridMap = Grid.map((row, rowIndex) => {
		return (
			<div key={rowIndex}>
				{row.map((node, nodeIndex) => {
					const { row, col, isStart, isEnd, isWall, isPath, isVisited } = node;
					return (
						<Node
							key={`${row}${col}`}
							width={40}
							height={40}
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
				{GridMap}
			</div>
			<Button variant="contained" color="primary" onClick={ () => animateAlgorithm() }>Animate Algorithm</Button>
		</>
    )
}

export default Grid