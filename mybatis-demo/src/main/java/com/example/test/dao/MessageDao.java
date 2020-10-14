package com.example.test.dao;

import com.example.test.bean.MessageBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface MessageDao {
    List<MessageBean> getList();

    int insertOne(MessageBean messageBean);
    int removeOne(String id);
}
