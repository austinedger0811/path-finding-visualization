import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Node from './Node'

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

const createNode = (col, row) => {
   return {
       col,
       row,
       isStart: false,
       isEnd: false,
       isVisited: false,
	   isWall: false,
	   isPath: false,
       distance: Infinity,
       prevNode: null,
   };
}

const setStart = (grid, col, row) => {
	grid[col][row].isStart = true;
};

const setEnd = (grid, col, row) => {
	grid[col][row].isEnd = true;
}

const setWall = (grid, col, row) => {
	grid[col][row].isWall = true;
};

const setWalls = (grid, walls) => {
	for (let i = 0; i < walls.length; i++) {
		let wall = walls[i];
		setWall(grid, wall[0], wall[1]);
	}
};

const initGrid = (rows, colums) => {
    var grid = []
    for (let row = 0; row < rows; row ++) {
        grid.push([])
        for (let col = 0; col < colums; col ++) {
            grid[row].push(createNode(col, row));
        }
    }
    return grid;
}

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

const bfs = (grid, start, end) => {

	var location = {
		row: start[0],
		col: start[1],
	};

	var queue = [];
	queue.push(location);

	while (queue.length) {
		var currentLocation = queue.shift();
		if (currentLocation.row === end[0] && currentLocation.col === end[1]) {
			return currentLocation;
		}
		grid[currentLocation.row][currentLocation.col].isVisited = true;
		var neighbors = getNeighbors(grid, currentLocation.row, currentLocation.col);
		for (let neighbor of neighbors) {
			if (grid[neighbor.row][neighbor.col].isVisited !== true) {
				queue.push(neighbor);
				grid[neighbor.row][neighbor.col].prevNode = currentLocation;
			}
		}
	}

	return false;
};

const logPath = (grid, endNode) => {
	
	var path = [];
	path.push(endNode);
	while (true) {
		var row = endNode.row;
		var col = endNode.col;
		var prevNode = grid[row][col][prevNode];
		if (prevNode === null) {
			break;
		}
		path.push(prevNode);
		endNode = {
			row: endNode.row,
			col: endNode.col,
		};
	}

	console.log(path);
};

const getPath = (grid, end) => {
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

	return path;
};

const drawPath = (grid, path) => {
	for (let i = 0; i < path.length; i++) {
		let nodeCord = path[i];
		let row = nodeCord.row;
		let col = nodeCord.col;
		grid[row][col].isPath = true;
	}
};



function Grid(props) {

    let classes = useStyles(props);

    const { rows, colums } = props;

	var start = [4, 4];
	var end = [12, 12];
	var walls = [
		[7, 3],
		[7, 4],
		[7, 5],
		[7, 6],
		[7, 7],
		[9, 9],
		[10, 9],
	];

    var grid = initGrid(rows, colums);
	setStart(grid, start[0], start[1]);
	setEnd(grid, end[0], end[1]);
	setWalls(grid, walls);
	bfs(grid, start, end);
	var path = getPath(grid, end);
	drawPath(grid, path);

	const gridMap = grid.map((row, rowIndex) => {
		return (
			<div key={rowIndex}>
				{row.map((node, nodeIndex) => {
					const { row, col, isStart, isEnd, isWall, isPath, isVisited } = node;
					return (
						<Node
							key={`${row}${col}`}
							width={40}
							height={40}
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
        <div className={classes.root}>
            {gridMap}
        </div>
    )
}

export default Grid