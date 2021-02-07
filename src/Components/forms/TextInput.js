import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import React, {useState} from "react";
import {makeStyles, createStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& .MuiTextField-root': {
				margin: theme.spacing(1),
				width: '25ch',
			},
		},
	}),
);


const TextInput = (props) => {
	const classes = useStyles();

	const [value, setValue] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value)
		props.returnAnswer(event.target.value)
	};

	return (
		<TextField
			label={props.label}
			id={props.id}
			onChange={handleChange}
			value={value}
			helperText={props.helperText}
			InputProps={{
				startAdornment: <InputAdornment position="start">{props.label}</InputAdornment>,
			}}
		/>)
}

export default TextInput;