/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demo;

import org.apache.catalina.UserDatabase;
import com.example.demo.databases.Userdata;
import com.example.demo.databases.Userdatabase;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author richals
 */

@RestController
@RequestMapping(value="/")
@CrossOrigin
public class useroperation {
    
    @Autowired
    private Userdatabase userdatabase;
    
    public Double createUserId()
    {
        return Math.random()*154763;
    }
    
    private Boolean checkUserId(Double userId)
    {
        Optional<Userdata> user;
        
        user=userdatabase.findById(userId);
        if(user.isPresent())
            return false;
        return true;
    }
    
    @PostMapping("/user")
    public String registeruser(@RequestBody Map<String,String> userdata)
    {
        Double userId=createUserId();
        
        while( ! checkUserId(userId) ){
            
            userId=createUserId();
        }
        
        Userdata user=new Userdata();
        user.setuserId(userId);
        user.setusername(userdata.get("username"));
        user.setmobile(userdata.get("mobile"));
        user.setemail(userdata.get("email"));
        user.setaddress(userdata.get("address"));
        user.setcity(userdata.get("city"));
        
        userdatabase.save(user);
        
        return "user is successfully created with user id - "+user.getuserId();
    }
    
    @GetMapping("/getuser")
    public Userdata getuser(@RequestHeader Double userId)
    {
        Optional<Userdata> user=userdatabase.findById(userId);
        if (user.isEmpty())
                 return null;
        return user.get();
        
    }
    
    @GetMapping("/alluser")
    public List<Userdata> getalluser()
    {
        return userdatabase.findAll();
    }
    
    @DeleteMapping("/user")
    public String deleteuser(@RequestHeader Double userId)
    {
        if(checkUserId(userId)) return "not found";
        userdatabase.deleteById(userId);
        return "success";
    }
    
    @GetMapping("/username")
    public Boolean checkusername(@RequestHeader String username)
    {
        List<Userdata> user=userdatabase.findAll().stream().filter(x->x.getusername().equals(username)).collect(Collectors.toList());
        return user.size()==0;
        
    }
    
    @PostMapping("/edit")
    public String edituser(@RequestBody Map<String,String> userdata,@RequestHeader String userId)
    {
        Double id=Double.parseDouble(userId);
        Optional<Userdata> user=userdatabase.findById(id);
        
        if(user.isEmpty()) return "userId not found";
        
        userdatabase.deleteById(id);
        
        user.get().setusername(userdata.get("username"));
        user.get().setmobile(userdata.get("mobile"));
        user.get().setemail(userdata.get("email"));
        user.get().setaddress(userdata.get("address"));
        user.get().setcity(userdata.get("city"));
        
        userdatabase.save(user.get());
        
        return "successful";
        
    }
    
    @GetMapping("/test")
    public String test(){
        userdatabase.deleteAll();
        return "success";
    }
    
}
