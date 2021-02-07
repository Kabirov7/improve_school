import React, {useState, useEffect, useContext} from "react";
import firebase from "../../util/firebase";
import {AuthContext} from "../../util/Auth";
import {makeStyles, createStyles, Theme, Typography} from "@material-ui/core";
import {Redirect} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextInput from "../forms/TextInput";
import {red} from "@material-ui/core/colors";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({}),
);

const CreateComment = () => {
	const [school, setSchool] = useState("")
	const [message, setMessage] = useState("")
	const [subject, setSubject] = useState("")
	const [availableWrite, setAvailableWrite] = useState()
	const [save, setSave] = useState()

	const {currentUser} = useContext(AuthContext);
	const classes = useStyles();

	const history = useHistory();

	useEffect(() => {
		const db = firebase.firestore()
		const usersRef = db.collection('users').doc(currentUser.uid)

		usersRef.get()
			.then((docSnapshot) => {
				if (docSnapshot.exists) {
					usersRef.onSnapshot((doc) => {
						let d = new Date() > doc.data()['lastWrite'].toDate()
						setAvailableWrite(d)
					});
				} else {
					let date = new Date()
					date.setDate(date.getDate() - 12)
					usersRef.set({
						email: currentUser.email,
						lastWrite: firebase.firestore.Timestamp.fromDate(date)
					}) // create the document
					setAvailableWrite(true)

				}
			});

		/*firebase.firestore().collection('users').doc(currentUser.uid + "1232").get()
			.then(doc => {
				let d = new Date() > doc.data()['lastWrite'].toDate()
				setAvailableWrite(d)
				console.log("ddd => ", d)
				console.log("setAvailableWrite => ", availableWrite)
			})*/
	}, [])

	useEffect(() => {
		firebase.firestore().collection('users').doc(currentUser.uid).get()
			.then(doc => {
				let d = new Date() > doc.data()['lastWrite'].toDate()
				setAvailableWrite(d)
				console.log("ddd => ", d)
				console.log("setAvailableWrite => ", availableWrite)
			})
	}, [save])

	const returnSchool = (answer) => {
		setSchool(answer)
	}

	const returnSubject = (answer) => {
		setSubject(answer)
	}

	const returnMessage = (event) => {
		setMessage(event.target.value)
	};

	const saveComment = () => {
		let date = new Date()
		date.setDate(date.getDate() + 1)

		let isSubject, isMessage = true;
		let db = firebase.firestore()

		let data = {
			school: school,
			subject: subject,
			message: message,
			email: currentUser.email,
			created: firebase.firestore.Timestamp.fromDate(date)

		}

		if (subject.indexOf(" ") == -1 && subject.indexOf("#") == 0) {
			isSubject = false
		}

		if (message.length >= 140) {
			isMessage = false
		}

		console.log('is it able =>', availableWrite)
		if (!isSubject && !isMessage && availableWrite && !save) {
			db.collection("messages").doc().set(data).then()
			db.collection("users").doc(currentUser.uid).set({
				email: currentUser.email,
				lastWrite: firebase.firestore.Timestamp.fromDate(date)
			})
			console.log('save')
			setSave(true)
		}
	}

	const routeChange = () => {
		history.push('/comments')
	}

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<TextInput
						label="School"
						id="school"
						returnAnswer={returnSchool}
						helperText="School name (ШГ №1, ШГ #1)"
						InputProps={{
							startAdornment: <InputAdornment position="start">School</InputAdornment>,
						}}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextInput
						label="Subject"
						id="subject"
						returnAnswer={returnSubject}
						helperText="HashTag (#lovlymath)"
						InputProps={{
							startAdornment: <InputAdornment position="start">School</InputAdornment>,
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<TextField
						style={{margin: 20}}
						id={"message"}
						label="Message"
						value={message}
						onChange={returnMessage}
						multiline
						rows={5}
						variant="outlined"
						helperText={`Length of the text(${message.length}) must be > 140 char`}
						fullWidth
					/>
				</Grid>
				<Grid item xs={9}>
					{!availableWrite ? <Typography> Вы уже писали сообщение сегодня</Typography> : <div></div>}
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<Button variant="contained" color="primary"
									onClick={() => saveComment()}
					>
						Comment
					</Button>
				</Grid>
			</Grid>

			<Grid container style={{marginTop: 30}} spacing={15}>
				<Grid item xs={9}>
					<Button color="primary" className="px-4"
									onClick={routeChange}>
						Watch all comments
					</Button>
				</Grid>
			</Grid>

			<Grid container style={{marginTop: 30}} spacing={15}>
				<Grid item xs={9}>
					<Button onClick={() => firebase.auth().signOut()}>Log out</Button>
				</Grid>
			</Grid>

		</div>
	)
}

export default CreateComment;