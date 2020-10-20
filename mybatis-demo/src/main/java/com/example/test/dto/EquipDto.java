package com.example.test.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class EquipDto implements Serializable {
    private int lv;
    private int type;
    private int part;
    private int cost;

    public int getLv() {
        return lv;
    }

    public void setLv(int lv) {
        this.lv = lv;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getPart() {
        return part;
    }

    public void setPart(int part) {
        this.part = part;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }
}
