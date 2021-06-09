import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "space-between",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(2),
      width: 140

    },
    title: {
        marginRight: theme.spacing(12)
    },
    formControl: {
        minWidth: 200,
        marginRight: theme.spacing(2)
    },
  }));

function LogicBar() {

    const classes = useStyles();

    const [wallMethod, setWallMethod] = useState('');
    const [pathMethod, setPathMethod] = useState('');

    const handleWallChange = (event) => {
        setWallMethod(event.target.value);
    };

    const handlePathChange = (event) => {
        setPathMethod(event.target.value);
    }

    return (
        <div className={classes.root}>
            <div>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={wallMethod}
                        onChange={handleWallChange}
                    >
                        <MenuItem value={'value1'}>Random</MenuItem>
                        <MenuItem value={'value2'}>Randomized DFS</MenuItem>
                        <MenuItem value={'value3'}>Recursive Division</MenuItem>
                    </Select>
                </FormControl> 
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={pathMethod}
                        onChange={handlePathChange}
                    >
                        <MenuItem value={'value1'}>BFS</MenuItem>
                        <MenuItem value={'value2'}>Twenty</MenuItem>
                        <MenuItem value={'value3'}>Thirty</MenuItem>
                    </Select>
                </FormControl> 
            </div>
            <div>
                <Button className={classes.button} variant="contained" color="secondary">Find Path</Button>
                <Button className={classes.button} variant="contained" color="secondary">Add Walls</Button>
                <Button className={classes.button} variant="contained" color="secondary">Reset</Button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default LogicBar