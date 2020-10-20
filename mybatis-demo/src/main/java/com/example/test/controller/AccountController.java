package com.example.test.controller;

import com.example.test.bean.AccountBean;
import com.example.test.bean.EquipBean;
import com.example.test.bean.ResponseBean;
import com.example.test.dto.EquipDto;
import com.example.test.dto.MessageDto;
import com.example.test.service.AccountService;
import com.example.test.service.EquipService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/account/v1")
public class AccountController {
    @Autowired
    AccountService accountService;
    @Autowired
    EquipService equipService;

    @GetMapping("/info")
    public ResponseBean<AccountBean> getAccountInfo() {
        int id = 1;
        return new ResponseBean<>(accountService.getAccount(id));
    }

    @GetMapping("/equipList")
    public ResponseBean<List<EquipBean>> getUserUsedEquip() {
        int id = 1;
        List<EquipBean> list = equipService.getUserAllEquip(id);
        return new ResponseBean<>(list);
    }

    @PostMapping("/openEquipBox")
    public ResponseBean<EquipBean> openEquipBox(@RequestBody EquipDto dto) {
        int uid = 1;

        // todo 事务处理
        // 扣除价格
        int cost = dto.getCost();
        accountService.updateGold(uid, -cost);

        // 随机生成一件装备
        EquipBean equip = equipService.generateEquip(dto, uid);

        return new ResponseBean<>(equip);
    }
}
