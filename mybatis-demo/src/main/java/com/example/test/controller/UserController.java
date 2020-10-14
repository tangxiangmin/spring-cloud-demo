package com.example.test.controller;

import com.example.test.bean.UserBean;
import com.example.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/user/v1")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/list")
    public List<UserBean> welcome() {
        List<UserBean> userList = userService.getUserList();
        return userList;
    }
}
