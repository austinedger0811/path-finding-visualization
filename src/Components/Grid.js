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

function initGrid(rows, colums) {
    var grid = []
    for (let row = 0; row < rows; row ++) {
        grid.push([])
        for (let col = 0; col < colums; col ++) {
            grid[row].push(<Node key={`${col}${row}`} color={'white'} />)
        }
    }
    return grid;
}

function setStart(grid, row, col) {
    grid[row][col] = <Node key={`${col}${row}`} color={'green'} /> 
}

function setEnd(grid, row, col) {
    grid[row][col] = <Node key={`${col}${row}`} color={'red'} /> 
}

function Grid(props) {

    let classes = useStyles(props);

    const { rows, colums } = props;

    var grid = initGrid(rows, colums);
    setStart(grid, 4, 4);
    setEnd(grid, 35, 35);


    return (
        <div className={classes.root}>
            {grid}
        </div>
    )
}

export default Grid