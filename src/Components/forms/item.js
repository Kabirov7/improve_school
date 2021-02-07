import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
		fontWeight: 700
	},
	pos: {
		marginBottom: 12,
	},
	container: {
		marginTop:20
	}
});

const Item = (props) => {
	const classes = useStyles();
	
	return (
		<div className={classes.container}>
			<Card>
				<CardContent>
					<Typography className={classes.title} color="black" gutterBottom>
						School: {props.school}
					</Typography>
					<Typography className={classes.title} color="black" gutterBottom>
						HashTag: {props.subject}
					</Typography>
					<Typography variant="body2" component="p">
						{props.message}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)

}

export default Item