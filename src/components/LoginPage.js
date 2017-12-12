import React from 'react';
import { fetchUsers } from "./../action-creators/starwars_actions";
import { connect } from "react-redux";
import constants from '../common/constants';
import PlanetSearch from './PlanetSearch';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: "",
            password: "",
            userValid: false
        }
        this.nameHandler = this.nameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
    }

    nameHandler(event) {
        this.setState({ name: event.target.value });
    }

    passwordHandler(event) {
        this.setState({ password: event.target.value });
    }

    componentWillMount() {
        fetchUsers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users != undefined) {
            this.setState({ users: nextProps.users });
        }
    }

    validateLogin() {
        let allUsers = this.state.users;
        let userName = this.state.name;
        let password = this.state.password;
        let validUser = false;
        
        allUsers.map(item => {
            if (item.name == userName && item.birth_year == password) {
                validUser = true;
            }
        });

         if (validUser == false) {
             alert(constants.INVALID_LOGIN);
         }
         else{
             this.setState({userValid:true})
            // this.props.updateLogin(validUser, userName);
         }
    }
    
    render(){
        return(
            <div className="main-container">
            <div className="container">
            {this.state.userValid?
            <PlanetSearch user = {this.state.name} unMountPlanet={()=>this.setState({userValid:false})}/>:
            <section id="content">
            <form action="">
                <h1>Login Form</h1>
                <div>
                    <input type="text" placeholder="Username" required="" id="username" value={this.state.name} onChange={this.nameHandler} />
                </div>
                <div>
                    <input type="password" placeholder="Password" required="" id="password" value={this.state.password} onChange={this.passwordHandler} />
                </div>
            </form>
            <div className="button">
            <button  onClick={this.validateLogin}>Login</button>
            </div>
        </section>}
            
        </div>
       </div> 
        )
    }
}
export default connect(state => (
    {
        users: state.starwarsReducer.users
    }
))(Login);