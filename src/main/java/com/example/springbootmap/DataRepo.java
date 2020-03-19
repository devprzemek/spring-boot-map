package com.example.springbootmap;

import org.springframework.stereotype.Repository;

import java.util.LinkedHashMap;
import java.util.Map;

@Repository
public class DataRepo {
    private Map<String, Integer> casesList;

    public DataRepo() {
        this.casesList = new LinkedHashMap<>();
    }

    public Map<String, Integer> getCasesList() {
        return casesList;
    }

    public void add(String key, int value){
        casesList.put(key, value);
    }
}
