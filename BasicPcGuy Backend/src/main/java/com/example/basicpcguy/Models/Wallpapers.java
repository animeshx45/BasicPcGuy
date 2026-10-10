package com.example.basicpcguy.Models;

import jdk.jfr.DataAmount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Wallpapers {
    @Id
    private Integer id;
    private String slug;
    private String title;
    private String subtitle;
    private String story;
    private String category;
    private String badge;
    private String metaCategory;
    private String publishedAt;
    private String imageUrl;
    private String windowsUrl;
    private String macUrl;
    private String androidUrl;

}
