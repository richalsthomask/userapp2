/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo.databases;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author richa
 */
@Document(collection="Userdata")
public class Userdata {
    
    @Id
    private Double userId;     
    private String username;
    private String mobile;
    private String email;
    private String address;
    private String city;
    
    public void setuserId(Double userId)
    {
        this.userId=userId;
    }
    
    public Double getuserId()
    {
        return this.userId;
    }
    
    public void setusername(String username)
    {
        this.username=username;
    }
    
    public String getusername()
    {
        return this.username;
    }
    
    public void setmobile(String mobile)
    {
        this.mobile=mobile;
    }
    
    public String getmobile()
    {
        return this.mobile;
    }
    
    public void setemail(String email)
    {
        this.email=email;
    }
    
    public String getemail()
    {
        return this.email;
    }
    
    public void setaddress(String adress)
    {
        this.address=adress;
    }
    
    public String getaddress()
    {
        return this.address;
    }
    
    public void setcity(String city)
    {
        this.city=city;
    }
    
    public String getcity()
    {
        return this.city;
    }
    
    
    
}
