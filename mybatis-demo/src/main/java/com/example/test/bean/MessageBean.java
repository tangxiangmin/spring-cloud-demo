package com.example.test.bean;


import java.util.List;

public class MessageBean {

    private long id;
    private long userId;
    private long pid;
    private String content;
    private java.sql.Timestamp createdAt;
    private long replyId;

    private List<MessageBean> replyList;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }


    public long getPid() {
        return pid;
    }

    public void setPid(long pid) {
        this.pid = pid;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }


    public long getReplyId() {
        return replyId;
    }

    public void setReplyId(long replyId) {
        this.replyId = replyId;
    }

    public List<MessageBean> getReplyList() {
        return replyList;
    }

    public void setReplyList(List<MessageBean> replyList) {
        this.replyList = replyList;
    }

}
