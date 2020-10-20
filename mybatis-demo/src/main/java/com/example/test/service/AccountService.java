package com.example.test.service;

import com.example.test.bean.AccountBean;
import com.example.test.dao.AccountDao;
import com.example.test.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private AccountDao accountDao;

    @Autowired
    private MessageDao messageDao; // 自动注入Dao层实例


    public AccountBean getAccount(int uid) {
        return accountDao.getOne(uid);
    }

    public int updateGold(int uid, long num) {
        AccountBean bean = this.getAccount(uid);
        long sum = bean.getGold() + num;
        return accountDao.updateGold(uid, sum);
    }
}
