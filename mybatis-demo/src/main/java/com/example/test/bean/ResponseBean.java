package com.example.test.bean;

public class ResponseBean<T> {

    private int code;
    private String msg;
    private T data;

    public ResponseBean() {
        super();
    }

    public ResponseBean(T data) {
        super();
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int id) {
        this.code = id;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}