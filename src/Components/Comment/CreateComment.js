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

		if (message.length >= 50) {
			isMessage = false
		}

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
		<div style={{marginTop:40}}>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<TextInput
						label="School"
						id="school"
						returnAnswer={returnSchool}
					/>
				</Grid>
				<Grid item xs={4}>
					<TextInput
						label="Тема"
						id="subject"
						returnAnswer={returnSubject}
						helperText="HashTag (#lovlymath)"
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<TextField
						style={{margin: 20}}
						id={"message"}
						label="История"
						value={message}
						onChange={returnMessage}
						multiline
						rows={5}
						variant="outlined"
						helperText={`Длина текста(${message.length}) должна быть > 50 символов`}
						fullWidth
					/>
				</Grid>
				<Grid item xs={9}>
					{!availableWrite ? <Typography> Вы уже рассказывали историю сегодня</Typography> : <div></div>}
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<Button variant="contained" color="primary"
									onClick={() => saveComment()}
					>
						Оставить историю
					</Button>
				</Grid>
			</Grid>

			<Grid container style={{marginTop: 30}} spacing={15}>
				<Grid item xs={9}>
					<Button color="primary" className="px-4"
									onClick={routeChange}>
						Посмотреть все истории
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