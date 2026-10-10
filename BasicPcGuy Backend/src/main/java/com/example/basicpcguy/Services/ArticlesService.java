package com.example.basicpcguy.Services;
import com.example.basicpcguy.Models.Articles;
import com.example.basicpcguy.Models.Wallpapers;
import com.example.basicpcguy.Repository.ArticlesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class ArticlesService {
    private final ArticlesRepo articlesRepo;
    @Autowired
    public ArticlesService(ArticlesRepo articlesRepo) {
        this.articlesRepo = articlesRepo;
    }

    public List<Articles> getArticle() {
        return articlesRepo.findAll();
    }

    public Optional<Articles> getArticlesbyId(int id) {
        return articlesRepo.findById(id);
    }

    public void addArticles(Articles articles) {
        articlesRepo.save(articles);
    }

    public void updatetheArticlec(Articles articles) {
        articlesRepo.save(articles);
    }
}
