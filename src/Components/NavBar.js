import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
		button: {
			marginRight: theme.spacing(2)
		},
    title: {
        marginRight: theme.spacing(12)
    },
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
  }));

function NavBar() {

    const classes = useStyles();

    return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
							<IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
								<MenuIcon />
							</IconButton>
							<Typography className={classes.title} variant="h6">Path Finding Visualizer</Typography>
							<Button variant="contained" color="primary" className={classes.button} endIcon={<ArrowDropDownIcon />} disableElevation>Search Algorithm</Button>
							<Button variant="contained" color="primary" className={classes.button} endIcon={<ArrowDropDownIcon />} disableElevation>Add Walls</Button>
							<Button variant="contained" color="secondary" className={classes.button} disableElevation>Run Visualization</Button>
							<Button variant="contained" color="secondary" className={classes.button} disableElevation>Reset</Button>
	

					</Toolbar>
				</AppBar> 
      </div>
    )
}

export default NavBar
