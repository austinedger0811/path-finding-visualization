import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    root: props => ({
        width: props.width,
        height: props.height,
        border: '1px solid black',
    }),
    start: {
        backgroundColor: 'green'
    },
    end: {
        backgroundColor: 'red'
    },
    normal: {
        backgroundColor: 'white'
    }
  });

function Node(props) {

    let classes = useStyles(props);
    const { isStart, isEnd } = props;

    return (
        <div className={`${classes.root} ${isStart ? classes.start : isEnd ? classes.end : classes.normal}`} />
    )
}

export default Node
