package com.varun.gym.gymMember.gym.dto;

public class ChartData {
    private Object name; // Can be String (month) or Enum (type)
    private Object value; // Can be Long (count) or BigDecimal (sum)

    public Object getName() {
        return name;
    }

    public void setName(Object name) {
        this.name = name;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public ChartData() {
    }

    public ChartData(Object name, Object value) {
        this.name = name;
        this.value = value;
    }

    @Override
    public String toString() {
        return "ChartData{" +
                "name=" + name +
                ", value=" + value +
                '}';
    }
}

