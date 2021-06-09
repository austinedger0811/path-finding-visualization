import React from 'react'
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
		listItemSecondaryText: {
			color: 'lightgray',
		},
  }));

	// Cange to algorithm options
	const options = [
		'Breadth First Search',
		'Depth First Search',
		'Dijkstra\'s',
		'Other',
	];
	
	// add wall options

function NavBar() {

    const classes = useStyles();

		const [anchorEl, setAnchorEl] = React.useState(null);

		// Change to algorith index
		const [selectedIndex, setSelectedIndex] = React.useState(1);

		// Add hook for wall index

		const handleClickListItem = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleMenuItemClick = (event, index) => {
			setSelectedIndex(index);
			setAnchorEl(null);
		};
	
		const handleClose = () => {
			setAnchorEl(null);
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
									onClick={handleClickListItem}
								>
									<ListItemText primary="Search Algorithm" secondary={options[selectedIndex]} classes={{ secondary: classes.listItemSecondaryText }} />
								</ListItem>
							</List>
							<Menu
								id="search-algorithm"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{options.map((option, index) => (
									<MenuItem
										key={option}
										selected={index === selectedIndex}
										onClick={(event) => handleMenuItemClick(event, index)}
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
									onClick={handleClickListItem}
								>
									<ListItemText primary="Add Walls" secondary={options[selectedIndex]} classes={{ secondary: classes.listItemSecondaryText }} />
								</ListItem>
							</List>
							<Menu
								id="add-walls"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{options.map((option, index) => (
									<MenuItem
										key={option}
										selected={index === selectedIndex}
										onClick={(event) => handleMenuItemClick(event, index)}
									>
            				{option}
          				</MenuItem>
        				))}
							</Menu>


						

							<Button variant="contained" color="primary" className={classes.button} endIcon={<ArrowDropDownIcon />} disableElevation>Add Walls</Button>
							<Button variant="contained" color="secondary" className={classes.button} disableElevation>Run Visualization</Button>
							<Button variant="contained" color="secondary" className={classes.button} disableElevation>Reset</Button>
					</Toolbar>
				</AppBar> 
      </div>
    )
}

export default NavBar
