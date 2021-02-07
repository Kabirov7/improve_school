import React, {useState, useEffect, useContext} from "react";
import firebase from "../../util/firebase";
import {AuthContext} from "../../util/Auth";
import Item from "../forms/item";
import {useHistory} from "react-router-dom";
import {makeStyles, createStyles, Theme, Typography, Link} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withRouter, Redirect} from "react-router";
import Button from '@material-ui/core/Button';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

const Comments = () => {
	const [items, setItems] = useState([]);
	const {currentUser} = useContext(AuthContext);
	const history = useHistory();


	useEffect(() => {
		let db = firebase.firestore();
		db.collection("messages").orderBy("created", "desc")
			.onSnapshot(function (querySnapshot) {
				let items = [];
				querySnapshot.forEach(function (doc) {
					items.push(doc.data());
				});
				setItems(items);
			});
	}, []);

	const routeChange = () => {
		let path = `improve_school`;
		history.push(path);
	}

	useEffect(() => {
		console.log(items)
	}, [items])
	return (
		<div>
			<Button color="primary" className="px-4"
							onClick={routeChange}>
				Create Comments
			</Button>
			{items.map((el, i) => {
				return <Item school={el.school} subject={el.subject} message={el.message}/>
			})}
		</div>

	)
}
export default Comments