import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    root: {
        width: 20,
        height: 20,
        border: '1px solid black',
    },
  });

function Node(props) {

    let classes = useStyles();

    return (
        <div className={classes.root} />
    )
}

export default Node
