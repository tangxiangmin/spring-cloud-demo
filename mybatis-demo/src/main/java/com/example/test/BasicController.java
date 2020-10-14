package com.example.test;

import com.example.test.bean.UserBean;
import com.example.test.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BasicController {
    //将Service注入Web层
    @Autowired
    UserService userService;

    @GetMapping("/welcome")
    public String welcome() {
        return "Hello World";
    }
    @GetMapping("/welcome-with-object")
    public WelcomeBean welcomeWithObject() {
        return new WelcomeBean("Hello World");
    }

    private static final String helloWorldTemplate = "Hello World, %s!";
    @GetMapping("/welcome-with-parameter/name/{name}")
    public WelcomeBean welcomeWithParameter(@PathVariable String name)
    {
        return new WelcomeBean(String.format(helloWorldTemplate, name));
    }
    // 获取请求参数，返回JSON
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public UserBean login(@RequestParam(name = "name") String name, @RequestParam(name = "password") String password) {
        UserBean userBean = userService.loginIn(name, password);
        System.out.println(userBean);
        return userBean;
    }
}