package com.example.auth;


import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.ws.rs.QueryParam;

@RestController
@Configuration
public class AuthController {

    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String findName(@QueryParam("name") String name, @QueryParam("password") String password) {
        RestTemplate restTemplate = getRestTemplate();
        // todo 检测name和password
        String msg = restTemplate.getForObject("http://user-service/user/" + name, String.class);
        System.out.println(msg);
        return msg;
    }

}
