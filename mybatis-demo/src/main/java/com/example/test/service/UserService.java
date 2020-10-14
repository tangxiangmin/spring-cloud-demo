package com.example.test.service;

import com.example.test.bean.UserBean;
import com.example.test.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


// 添加Service注解
@Service
public class UserService {
    @Autowired
    private UserDao userDao; // 自动注入Dao层实例

    public UserBean loginIn(String name, String password) {
        return userDao.getInfo(name, password);
    }

    public List<UserBean> getUserList(){
        return userDao.getList();
    }
}