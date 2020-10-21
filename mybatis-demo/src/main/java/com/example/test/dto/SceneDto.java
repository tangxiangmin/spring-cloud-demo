package com.example.test.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class SceneDto implements Serializable {
    private int heroId;
    private int gold;
    private int exp;

    public int getHeroId() {
        return heroId;
    }

    public void setHeroId(int heroId) {
        this.heroId = heroId;
    }

    public int getGold() {
        return gold;
    }

    public void setGold(int gold) {
        this.gold = gold;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }
}
