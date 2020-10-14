package com.example.test.service;

import com.example.test.bean.MessageBean;
import com.example.test.bean.ResponseBean;
import com.example.test.dao.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageDao messageDao; // 自动注入Dao层实例

    public List<MessageBean> getList() {
        return messageDao.getList();
    }

    public int insert(MessageBean messageBean) {
        return messageDao.insertOne(messageBean);
    }
    public int remove(String id) {
        return messageDao.removeOne(id);
    }
}
