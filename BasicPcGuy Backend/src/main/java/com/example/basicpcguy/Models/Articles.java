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
public class Articles {
    @Id
    private String id;
    private String slug;
    private String title;
    private String subtitle;
    private String publishedAt;
    private String metaCategory;
    private String badge;
    private String readTime;
    private String coverImage;
    private String excerpt;
    private String content;
}
