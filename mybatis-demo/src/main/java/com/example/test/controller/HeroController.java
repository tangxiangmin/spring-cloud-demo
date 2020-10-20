package com.example.test.controller;

import com.example.test.bean.HeroBean;
import com.example.test.bean.ResponseBean;
import com.example.test.service.HeroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hero/v1")
public class HeroController {
    @Autowired
    HeroService heroService;
    @GetMapping("/list")
    public ResponseBean<List<HeroBean>> getHeroList(){
        int uid = 1; // todo 根据请求头获取
        List<HeroBean> list = heroService.getHeroList(uid);
        return new ResponseBean<>(list);
    }

}
