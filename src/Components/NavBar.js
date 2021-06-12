import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { OptionsContext } from '../Context/OptionsContext'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
		button: {
			marginRight: theme.spacing(2),
		},
    title: {
        marginRight: theme.spacing(12)
    },
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		listItemSecondaryText: {
			color: 'lightgray',
		},
  }));

	const algorithmOptions = [
		'Breadth First Search',
		'Depth First Search',
		'Dijkstra\'s',
		'Other',
	];

	const wallOptions = [
		'None',
		'Random Wall Generation',
		'Randomized Depth First Search',
		'Recursive Division'
	];
	
function NavBar(props) {

		const { handleRunVisualizationClick, handleResetClick } = props;
    const classes = useStyles();

		const [anchorElAlgorithm, setAnchorElAlgorithm] = React.useState(null);
		const [anchorElWall, setAnchorElWall] = React.useState(null);

		const { algorithmIndex, setAlgorithmIndex, wallIndex, setWallIndex } = useContext(OptionsContext);

		const handleClickAlgorithmListItem = (event) => {
			setAnchorElAlgorithm(event.currentTarget);
		};

		const handleClickWallListItem = (event) => {
			setAnchorElWall(event.currentTarget);
		};

		const handleAlgorithmItemClick = (event, index) => {
			setAlgorithmIndex(index);
			setAnchorElAlgorithm(null);
		};

		const handleWallItemClick = (event, index) => {
			setWallIndex(index);
			setAnchorElWall(null);
		}
	
		const handleClose = () => {
			setAnchorElAlgorithm(null);
			setAnchorElWall(null);
		};

    return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography className={classes.title} variant="h6">Path Finding Visualizer</Typography>
						<List component="nav" aria-label="algorithm selector">
							<ListItem
								button
								aria-aria-haspopup="true"
								aria-controls="search-algorithm"
								aria-label="Search Algorithm"
								onClick={handleClickAlgorithmListItem}
							>
								<ListItemText primary="Search Algorithm" secondary={algorithmOptions[algorithmIndex]} classes={{ secondary: classes.listItemSecondaryText }} />
							</ListItem>
						</List>
						<Menu
							id="search-algorithm"
							anchorEl={anchorElAlgorithm}
							keepMounted
							open={Boolean(anchorElAlgorithm)}
							onClose={handleClose}
						>
							{algorithmOptions.map((option, index) => (
								<MenuItem
									key={algorithmOptions}
									selected={index === algorithmIndex}
									onClick={(event) => handleAlgorithmItemClick(event, index)}
								>
									{option}
								</MenuItem>
							))}
						</Menu>


						<List component="nav" aria-label="add walls">
							<ListItem
								button
								aria-aria-haspopup="true"
								aria-controls="add-walls"
								aria-label="Add Walls"
								onClick={handleClickWallListItem}
							>
								<ListItemText primary="Wall Generation" secondary={wallOptions[wallIndex]} classes={{ secondary: classes.listItemSecondaryText }} />
							</ListItem>
						</List>
						<Menu
							id="add-walls"
							anchorEl={anchorElWall}
							keepMounted
							open={Boolean(anchorElWall)}
							onClose={handleClose}
						>
							{wallOptions.map((option, index) => (
								<MenuItem
									key={wallOptions}
									selected={index === wallIndex}
									onClick={(event) => handleWallItemClick(event, index)}
								>
									{option}
								</MenuItem>
							))}
						</Menu>
						<Button variant="contained" color="secondary" className={classes.button} onClick={handleRunVisualizationClick} disableElevation>Run Visualization</Button>
						<Button variant="contained" color="secondary" className={classes.button} onClick={handleResetClick} disableElevation>Reset</Button>
					</Toolbar>
				</AppBar> 
      </div>
    )
}

export default NavBar
