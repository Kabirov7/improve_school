import './App.css';
import {
	BrowserRouter as Router,
	Route, Switch,
} from "react-router-dom";
import {AuthContext, AuthProvider} from "./util/Auth";
import firebase, { signInWithGoogle } from './util/firebase'
import LogIn from "./Components/Auth/LogIn"
import CreateComment from "./Components/Comment/CreateComment"
import Comments from "./Components/Comment/Comments"
import PrivateRoute from "./Components/Auth/PrivateRoute";
import Button from "@material-ui/core/Button";


function App() {
	return (
		<AuthProvider>
			<Router>
				<div className="App">
					<PrivateRoute exact path={"/improve_school"} component={CreateComment}/>
					<Route exact path={"/comments"} component={Comments}/>
					<Route exact path={"/login"} component={LogIn}/>
				</div>
			</Router>
		</AuthProvider>

);
}

export default App;
