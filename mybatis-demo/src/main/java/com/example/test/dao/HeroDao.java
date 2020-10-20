package com.example.test.dao;

import com.example.test.bean.HeroBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface HeroDao {
    public List<HeroBean> getUserHeroList(int uid);
}
