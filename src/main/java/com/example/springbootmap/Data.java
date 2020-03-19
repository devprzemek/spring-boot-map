package com.example.springbootmap;

public class Data {
    private String state;
    private int casesNumber;

    public Data(String state, int casesNumber) {
        this.state = state;
        this.casesNumber = casesNumber;
    }

    public Data() {
    }

    public String getState() {
        return state;
    }

    public int getCasesNumber() {
        return casesNumber;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCasesNumber(int casesNumber) {
        this.casesNumber = casesNumber;
    }

    @Override
    public String toString() {
        return "Data{" +
                "state='" + state + '\'' +
                ", casesNumber=" + casesNumber +
                '}';
    }
}
