package com.example.test.controller;

import com.example.test.bean.HeroBean;
import com.example.test.bean.ResponseBean;
import com.example.test.dto.EquipActionDto;
import com.example.test.service.EquipService;
import com.example.test.service.HeroService;
import com.example.test.utils.SysUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hero/v1")
public class HeroController {
    @Autowired
    HeroService heroService;
    @Autowired
    EquipService equipService;

    @GetMapping("/list")
    public ResponseBean<List<HeroBean>> getHeroList(){
        int uid = SysUtil.getUserId();
        List<HeroBean> list = heroService.getHeroList(uid);
        return new ResponseBean<>(list);
    }

    @PostMapping("/wearEquip")
    public ResponseBean<Boolean> wearEquip(@RequestBody EquipActionDto dto){
        // todo 校验用户是否拥有该装备，是否符合等级
        int res = equipService.setHeroEquip(dto.equipId, dto.heroId);

        return new ResponseBean<>( res == 1);
    }
    @PostMapping("/getOffEquip")
    public ResponseBean<Boolean> getOffEquip(@RequestBody EquipActionDto dto){
        int res = equipService.setHeroEquip(dto.equipId, 0);
        return new ResponseBean<>( res == 1);
    }
}
