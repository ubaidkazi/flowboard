package com.flowboard.app.controller;


import com.flowboard.app.dto.response.dashboard.DashboardResponse;
import com.flowboard.app.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/dashboard")
@RequiredArgsConstructor
public class DashboardController
{

    @Autowired
    DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<?> getDashboard(
            Authentication authentication
    ) {

        //userName
        String userName = authentication.getName();
        return  dashboardService.getDashboard(userName);


    }

}
