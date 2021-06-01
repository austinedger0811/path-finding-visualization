import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    root: props => ({
        width: props.width,
        height: props.height,
        border: '1px solid black',
    }),
    start: {
        backgroundColor: '#39a6a3'
    },
    end: {
        backgroundColor: '#f54748'
    },
    normal: {
        backgroundColor: 'white'
    },
    path: {
        backgroundColor: '#8DBFFE'
    },
    wall: {
        backgroundColor: '#111111'
    }
  });

function Node(props) {

    let classes = useStyles(props);
    const { isStart, isEnd, isWall, isPath } = props;

    return (
        <div className={`${classes.root} ${isStart ? classes.start : isEnd ? classes.end : isWall ? classes.wall : isPath ? classes.path : classes.normal}`} />
    )
}

export default Node
