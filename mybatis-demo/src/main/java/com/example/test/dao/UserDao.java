package com.example.test.dao;

import com.example.test.bean.UserBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserDao {

    UserBean getInfo(String name, String password);

    List<UserBean> getList();

}