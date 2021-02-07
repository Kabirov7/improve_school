import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import app, {signInWithGoogle} from "../../util/firebase";
import {AuthContext} from "../../util/Auth";
import {Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
	button: {
		marginTop: 50,
	},title: {
		fontSize: 10,
		marginTop:20
	},
});
const LogIn = ({history}) => {
	const classes = useStyles();
	const {currentUser} = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to={"/improve_school/"}/>
	}

	return (
		<div>
			<Button className={classes.button} onClick={() => signInWithGoogle()} variant="contained" color="secondary">
				Log in
			</Button>
			<Typography className={classes.title} color={"textSecondary"} component={'p'}>
				Данное веб приложение созданно для того чтобы любой ученик или учащийся мог рассказать что-то про его школу. Всё 100% анонимно. <br/>
				(Авторизация используется с целью устранения задвоений)
			</Typography>
		</div>

	)
}

export default LogIn;