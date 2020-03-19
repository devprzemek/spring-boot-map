package com.example.springbootmap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MapController {

    private final DataRepo dataRepo;

    public MapController(DataRepo dataRepo) {
        this.dataRepo = dataRepo;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String getMap(Model model){
        model.addAttribute("casesList", dataRepo.getCasesList());
        return "map";
    }
}
