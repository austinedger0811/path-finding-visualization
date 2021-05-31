import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    root: props => ({
        width: 20,
        height: 20,
        border: '1px solid black',
        backgroundColor: props.color
    }),
  });

function Node(props) {

    let classes = useStyles(props);

    return (
        <div className={classes.root} />
    )
}

export default Node
