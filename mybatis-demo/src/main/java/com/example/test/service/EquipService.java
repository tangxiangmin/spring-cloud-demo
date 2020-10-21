package com.example.test.service;

import com.example.test.bean.EquipBean;
import com.example.test.dao.AccountDao;
import com.example.test.dao.EquipDao;
import com.example.test.dto.EquipDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipService {
    @Autowired
    EquipDao equipDao;

    @Autowired
    AccountDao accountDao;

    public List<EquipBean> getUserAllEquip(int uid) {
        return equipDao.getUserAllEquip(uid);
    }

    public List<EquipBean> getUserUsedEquip(int uid) {
        return equipDao.getUserUsedEquip(uid);
    }

    public List<EquipBean> getUserUnUsedEquip(int uid) {
        return equipDao.getUserUnUsedEquip(uid);
    }

    public EquipBean generateEquip(EquipDto equipDto, int uid) {
        EquipBean equipBean = new EquipBean();
        // todo 生成装备的随机属性
        equipBean.setUid(uid);
        equipBean.setName("无敌装备");
        equipBean.setLv(equipDto.getLv());
        equipBean.setPart(equipDto.getPart());
        equipBean.setType(equipDto.getType());
        equipBean.setAttrs("");

        equipDao.insertOne(equipBean);

        return equipBean;
    }

    public int setHeroEquip(int equipId, int heroId){
        return equipDao.updateHero(equipId, heroId);
    }
}
