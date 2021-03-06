package com.example.test.service;

import com.example.test.bean.HeroBean;
import com.example.test.dao.HeroDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HeroService {
    @Autowired
    private HeroDao heroDao;

    public List<HeroBean> getHeroList(int uid) {
        return heroDao.getUserHeroList(uid);
    }

    public int addHeroExp(int heroId, long expNum) {
        HeroBean heroBean = heroDao.getOne(heroId);
        long exp = heroBean.getExp();
//        long lv = heroBean.getLv();
        // todo 处理升级
        heroBean.setExp(exp + expNum);

        return heroDao.updateOne(heroBean);
    }
}
