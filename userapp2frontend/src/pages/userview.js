import axios from "axios";
import React from "react";
import { Redirect } from 'react-router';
import './userview.css';
import Useredit from './useredit';

export default class Userview extends React.Component{

    constructor(){
        super();

        this.state={
            addpopup:false,
            users:[],
            redirect:true,
            userid:0.0,

        }
    }

    componentWillMount(){

        document.title="User App";

        axios.get( ' http://localhost:8080/alluser ' ) . then( res => { this.setState ({ users : res.data }) ; console.log( res.data )} )
    }

    toggleaddpopup(){

        this.setState({addpopup:! this.state.addpopup});
    }

    users(){

        return this.state.users.map( (value,index) => {

            return(
                <div id="box" onClick={ () => { this.setState({ userid : value.userId , redirect : false }) }}>
                    <br /><br />
                    <a class="popupText">Username : {value.username} </a>
                    <br/><br/>
                    <a class="popupText">Mobile : {value.mobile} </a>
                    <br /><br />
                    <a class="popupText">Email : {value.email} </a>
                    <br /><br />
                </div>
            )
        })
    }

    render(){

        if( this.state.redirect )

        return(

            <div>

              <div id="upperTab">

                  <br/>
                  
                    <a id="upperTabFont">
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User Data Viewer App
                    </a>
              </div>
              
                <div 
                   Style="background-image:url(laura-ockel-uC0VwiB9UmU-unsplash.jpg);
                          background-size:cover;
                          height:90vh;
                          width:100%;
                          overflow-y:scroll">
                    
                    {this.users()}

                    <div id="box" 
                         onClick={ () => { this.setState({ addpopup : true })} } >

                        <br/><br/>

                        <img 
                            id="addImage" 
                            width="100" 
                            src="1024px-OOjs_UI_icon_add.svg.png">
                            
                        </img>

                        <br/>

                        <a id="addtext" >
                             Add User
                        </a>
                    </div>

                    
              
              </div>

              {
                  this.state.addpopup ?
                    <Addpopup closepopup={this.toggleaddpopup.bind(this)}/> 
                    :
                     null
              }

            </div>
        );
        else return <Useredit userid= { this.state.userid } />;
    }
}

class Addpopup extends React.Component{

    constructor(){

        super();

        this.state={

            message:'',
            username:'',
            mobile:'',
            email:'',
            address:'',
            city:'',

        }
    }
    

    handlesubmit=async()=>{

        if( this.state.username === '' || this.state.mobile === '' || this.state.email === '' || this.state.address === '' || this.state.city === '' )

            { 
               this.setState({ message : 'All fields need to be filled to register user' }); 
               setTimeout( () => {this.setState({message:''})} , 4000 )
            }
        else{
              const response =  await axios.get( 'http://localhost:8080/username' , { headers:{ 'username' : this.state.username }});

              this.setState({ nameavailable : response.data });

             if( ! response.data)

               {
                 this.setState({ message : 'Username not available .Choose another username .' });
                 setTimeout( () => { this.setState({ message : '' })} , 4000 ); console.log( "sss" )
               }

             else{
                  axios.post( 'http://localhost:8080/user' , { username : this.state.username , 
                                                               mobile : this.state.mobile,
                                                               email : this.state.email,
                                                               address : this.state.address,
                                                               city : this.state.city})
                        .then( res => alert( res.data ) )

                 this.props.closepopup();

                 window.open('/home', '_self');

               }
        }
    }
    render(){

        return(

            <div id="popup">

                <div align="center" id="popupBox">

                    <button 
                        id="closepopup" 
                        onClick={this.props.closepopup}>
                            Close
                    </button>

                    <br /><br />
                    
                    <a class="popupText" Style="color:red">
                        {this.state.message}
                    </a>
                    
                    <br/><br/>

                    <a class="popupText" >
                        Username : 
                    </a>
                    <input 
                        id="name" 
                        class="popupInput" 
                        onChange={ (e) => {this.setState({username:e.target.value})}}>
                    </input>
                    
                    <br /><br />
                    
                    <a class="popupText" >
                        Mobile   &nbsp;&nbsp;&nbsp;&nbsp;: 
                    </a>
                    <input 
                        id="phone" 
                        type="tel" 
                        class="popupInput" 
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
                        onChange={(e) => { this.setState({ email: e.target.value }) }}>
                    </input>
                    
                    <br /><br />

                    <a class="popupText" >
                        Address  &nbsp;&nbsp;: 
                    </a>
                    <input 
                        class="popupInput" 
                        onChange={(e) => { this.setState({ address: e.target.value }) }}>
                    </input>
                    
                    <br /><br />

                    <a class="popupText" >
                        City   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : 
                    </a>
                    <input 
                        class="popupInput" 
                        onChange={(e) => { this.setState({ city: e.target.value }) }}>
                    </input>
                    
                    <br /><br /><br/>
 
                    <button 
                       align="center" 
                       id="popupsubmit" 
                       onClick={()=>{this.handlesubmit()}}>
                           Submit
                    </button>

                </div>
                
            </div>
        );
    }
}