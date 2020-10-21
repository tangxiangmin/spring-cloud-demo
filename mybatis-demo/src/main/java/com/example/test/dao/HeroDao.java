package com.example.test.dao;

import com.example.test.bean.HeroBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface HeroDao {
    public List<HeroBean> getUserHeroList(int uid);
    public HeroBean getOne(int id);
    public int updateOne(HeroBean bean);
}
