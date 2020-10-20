package com.example.test.dao;

import com.example.test.bean.EquipBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface EquipDao {
    public List<EquipBean> getUserAllEquip(int uid);
    public List<EquipBean> getUserUsedEquip(int uid);
    public List<EquipBean> getUserUnUsedEquip(int uid);

    int insertOne(EquipBean equipBean);
}
