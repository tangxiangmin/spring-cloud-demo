package com.example.test.dto;

import java.io.Serializable;
import lombok.Data;

@Data
public class MessageDto implements Serializable {
    private int pid;
    private int userId;
    private String content;
}
