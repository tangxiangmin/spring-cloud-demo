package com.example.test.dao;
import com.example.test.bean.AccountBean;
import org.springframework.stereotype.Component;

@Component
public interface AccountDao {
    AccountBean getOne(int uid);
    int updateGold(int uid, long num);
}
