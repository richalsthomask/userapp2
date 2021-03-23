import axios from "axios";
import React from "react";
import Deletepopup from "./deletepopup";
import './useredit.css';

export default class Useredit extends React.Component{
    
    constructor(){
        super();
        this.state={
             username:'',
             mobile:'',
             email:'',
             address:'',
             city:'',
             popup:true,
        }
    }
    componentWillMount(){

        axios.get( 'http://localhost:8080/getuser' ,
                   {headers : {'userId':this.props.userid }})
             .then( res => {this.setState({username : res.data.username,
                                           mobile : res.data.mobile,
                                           email : res.data.email,
                                           address : res.data.address,
                                           city : res.data.city});});
    }

    redirector=()=>{

        window.open('/home','_self');
    }

    handlesubmit=()=>{

        axios.post('http://localhost:8080/edit',
                   {username : this.state.username,
                    mobile : this.state.mobile,
                    email : this.state.email,
                    address : this.state.address,
                    city : this.state.city},
                  {headers:
                    {'userId':this.props.userid }})
              .then( res => console.log(res.data));
    }

    togglepopup=()=>{

           this.setState({ popup : !this.state.popup });
    }
    render(){
        return(
          <div id="frame">

              <div 
                  id="homelink" 
                  onClick={ ( )=> {this.redirector()}}>
                    {"<- home"}
              </div>
              
              <div id="accountdelete">
                  
                  <a 
                      id="deletetext" 
                      onClick={ () => { this.setState ({ popup : false })}}>
                    Delete Account
                   </a>

              </div>

            <div id="box1" align="center">

                    <br /><br />

                    <a class="popupText" Style="color:red">
                         {this.state.message}
                    </a>
                    
                    <br /><br />

                    <a class="popupText" >
                        Username : 
                    </a>
                    <input 
                       id="name" 
                       class="popupInput" 
                       value={this.state.username} 
                       onChange={(e) => { this.setState({ username: e.target.value }) }}>
                    </input>
                    
                    <br /><br />

                    <a class="popupText" >
                        Mobile   &nbsp;&nbsp;&nbsp;&nbsp;: 
                    </a>
                    <input 
                       id="phone" 
                       type="tel" 
                       class="popupInput" 
                       value={this.state.mobile} 
                       onChange={(e) => { this.setState({ mobile: e.target.value }) }}>
                    </input>
                    
                    <br /><br />

                    <a class="popupText" >
                        Email  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : 
                    </a>
                    <input 
                       id="email" 
                       class="popupInput" 
                       type="email" 
                       value={this.state.email} 
                       onChange={(e) => { this.setState({ email: e.target.value }) }}>
                    </input>
                    
                    <br /><br />

                    <a class="popupText" >
                        Address  &nbsp;&nbsp;: 
                    </a>
                    <input 
                       class="popupInput" 
                       value={this.state.address} 
                       onChange={(e) => { this.setState({ address: e.target.value }) }}>
                    </input>
                    
                    <br /><br />

                    <a class="popupText" >
                        City   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : 
                    </a>
                    <input 
                       class="popupInput" 
                       value={this.state.city} 
                       onChange={(e) => { this.setState({ city: e.target.value }) }}>
                    </input>
                    
                    <br /><br /><br />

                    <button 
                       align="center" 
                       id="popupsubmit" 
                       onClick={() => { this.handlesubmit() }}>
                         Submit
                    </button>
            </div>
            {
                this.state.popup ?
                        null : <Deletepopup 
                                      userId={this.props.userid} 
                                      closepopup={this.togglepopup.bind(this)}
                                />
            }
          </div>
        );
    }
}