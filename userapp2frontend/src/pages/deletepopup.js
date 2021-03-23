import axios from "axios";
import React from "react";
import './deletepopup.css'

export default class Deletepopup extends React.Component{

    constructor(){

        super();
        
    }
    render(){
        return(
            <div Style="height:100vh;
                        width:100%;
                        background-color:rgba(0,0,0,.5);
                        position:fixed;
                        top:0;
                        bottom:0;
                        left:0;
                        right:0">

                <div Style="height:30%;
                            width:35%;
                            background-color:white;
                            border-radius:20px;
                            position:relative;
                            top:33%;
                            left:32.5%;
                            border:1px solid red">

                    <br/><br/>

                    <a  Style="font-size:23px;
                               font-weight:600;
                               position:relative;
                               left:20px;">
                        Are you sure you want to delete this account
                    </a>

                    <div  
                       id="cancelbutton" 
                       onClick={this.props.closepopup} >
                           
                           <a Style="position:relative;
                                     top:3px;
                                     left:15px">
                                Cancel
                           </a>
                    </div>

                    <div 
                       id="okbutton" 
                       onClick={() => { axios.delete('http://localhost:8080/user',
                                                     { headers: { 'userId': this.props.userId } })
                                              .then(res => alert(res.data));
                                         window.open('/home', '_self');}} >

                        <a Style="position:relative;
                                  top:3px;
                                  left:10px">
                            Confirm
                        </a>
                    
                    </div>

                </div>
                
            </div>
        );
    }
}