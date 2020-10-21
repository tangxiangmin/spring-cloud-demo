package com.example.test.controller;

import com.example.test.bean.AccountBean;
import com.example.test.bean.EquipBean;
import com.example.test.bean.ResponseBean;
import com.example.test.dto.EquipDto;
import com.example.test.dto.MessageDto;
import com.example.test.dto.SceneDto;
import com.example.test.service.AccountService;
import com.example.test.service.EquipService;
import com.example.test.service.HeroService;
import com.example.test.utils.SysUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    HeroService heroService;

    @GetMapping("/info")
    public ResponseBean<AccountBean> getAccountInfo() {
        int uid = SysUtil.getUserId();
        return new ResponseBean<>(accountService.getAccount(uid));
    }

    @GetMapping("/equipList")
    public ResponseBean<List<EquipBean>> getUserUsedEquip() {
        int uid = SysUtil.getUserId();

        List<EquipBean> list = equipService.getUserAllEquip(uid);
        return new ResponseBean<>(list);
    }

    // 开箱子：消耗金币，获取装备
    @PostMapping("/openEquipBox")
    public ResponseBean<EquipBean> openEquipBox(@RequestBody EquipDto dto) {
        int uid = SysUtil.getUserId();
        // todo 事务处理
        // 扣除价格
        int cost = dto.getCost();
        accountService.updateGold(uid, -cost);

        // 随机生成一件装备
        EquipBean equip = equipService.generateEquip(dto, uid);

        return new ResponseBean<>(equip);
    }

    // 完成战斗：获取金币和经验
    @PostMapping("/finishScene")
    public ResponseBean<Boolean> finishScene(@RequestBody SceneDto dto) {
        int uid = SysUtil.getUserId();

        int exp = dto.getExp();
        int gold = dto.getGold();
        int heroId = dto.getHeroId();
        accountService.updateGold(uid, gold);
        heroService.addHeroExp(heroId, exp);
        return new ResponseBean<>(true);
    }
}
