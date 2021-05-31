import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Node from './Node'

const useStyles = makeStyles({
    root: props => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${props.colums}, 1fr)`, 
        gridTemplateRows: `repeat(${props.rows}, 1fr)`,
        alignSelf: 'flex-start',
        width: props.colums * 20,
        height: props.rows * 20,
        justifyContent: 'center',
    }),
});

const createNode = (col, row) => {
   return {
       col,
       row,
       isStart: false,
       isEnd: false,
       distance: Infinity,
       isVisited: false,
       prevNode: null,
   };
}

const setStart = (grid, col, row) => {
	grid[col][row].isStart = true;
};

const setEnd = (grid, col, row) => {
	grid[col][row].isEnd = true;
}

function initGrid(rows, colums) {
    var grid = []
    for (let row = 0; row < rows; row ++) {
        grid.push([])
        for (let col = 0; col < colums; col ++) {
            grid[row].push(createNode(col, row));
        }
    }
    return grid;
}

function Grid(props) {

    let classes = useStyles(props);

    const { rows, colums } = props;

    var grid = initGrid(rows, colums);
	setStart(grid, 10, 10);
	setEnd(grid, 25, 25);

	const gridMap = grid.map((row, rowIndex) => {
		return (
			<div key={rowIndex}>
				{row.map((node, nodeIndex) => {
					console.log(node)
					const { row, col, isStart, isEnd, isVisited } = node;
					return (
						<Node
							key={`${row}${col}`}
							width={20}
							height={20}
							isStart={isStart}
							isEnd={isEnd}
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