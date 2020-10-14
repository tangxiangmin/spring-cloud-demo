package com.example.test.controller;

import com.example.test.bean.MessageBean;
import com.example.test.bean.ResponseBean;
import com.example.test.dto.MessageDto;
import com.example.test.service.MessageService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@RestController
@RequestMapping("/message_board/v1")
@AllArgsConstructor
@Slf4j
public class MessageBoardController {
    @Autowired
    MessageService messageService;

    @GetMapping("/list")
    public List<MessageBean> list() {
        return messageService.getList();
    }

    @PostMapping("/submit")
    public ResponseBean<Boolean> submitMessage(@RequestBody MessageDto dto){
        MessageBean bean = new MessageBean();
        BeanUtils.copyProperties(dto, bean);
        return new ResponseBean<>(messageService.insert(bean) > 0);
    }
    @DeleteMapping("/{id}")
    public ResponseBean<Boolean> updateCard(@PathVariable String id) {
        return new ResponseBean<>(messageService.remove(id) > 0);
    }
}
