import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    root: props => ({
        width: props.width,
        height: props.height,
        border: '1px solid black',
    }),
    start: {
        background: 'linear-gradient(45deg, #47D163 30%, #29E7DB 90%)'
    },
    end: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    path: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
    },
    wall: {
        background: 'linear-gradient(45deg, #2F2F2F 30%, #121212 90%)'
    },
    normal: {
        backgroundColor: 'white'
    },
  });

function Node(props) {

    let classes = useStyles(props);
    const { row, col, isStart, isEnd, isWall, isPath, key } = props;

    return (
        <div id={`node-${row}-${col}`} className={`${classes.root} ${isStart ? classes.start : isEnd ? classes.end : isWall ? classes.wall : isPath ? classes.path : classes.normal}`} />
    )
}

export default Node
