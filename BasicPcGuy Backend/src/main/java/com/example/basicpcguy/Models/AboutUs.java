package com.example.basicpcguy.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class AboutUs {
    @Id
    private String id;
    private String title;
    private String subtitle;
    private List<String> description;
    private List<Pillar> pillars;
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Pillar {
        private String title;
        private String description;
        private String icon;
    }
}
