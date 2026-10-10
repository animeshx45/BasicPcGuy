package com.example.basicpcguy.Contollers;
import com.example.basicpcguy.Models.AboutUs;
import com.example.basicpcguy.Models.Articles;
import com.example.basicpcguy.Models.Wallpapers;
import com.example.basicpcguy.Repository.AboutUsRepo;
import com.example.basicpcguy.Services.AboutUsSercive;
import com.example.basicpcguy.Services.ArticlesService;
import com.example.basicpcguy.Services.WallpapersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://basicpcguy.vercel.app/")
public class AppControllers {
    private final WallpapersService wallpapersService;
    private final ArticlesService articlesService;;
    private final AboutUsSercive aboutUsSercive;

    @Autowired
    public AppControllers(WallpapersService wallpapersService, ArticlesService articlesService, AboutUsRepo aboutUsRepo, AboutUsSercive aboutUsSercive) {
        this.wallpapersService = wallpapersService;
        this.articlesService = articlesService;
        this.aboutUsSercive = aboutUsSercive;
    }
    @GetMapping("/api/wallpapers")
    public List<Wallpapers> getWallpapers() {
        return wallpapersService.getWallpapers();
    }
    @GetMapping("/api/articles")
    public List<Articles> getArticle(){
        return articlesService.getArticle();
    }
    @GetMapping("/api/wallpapers/{slug}")
    public Wallpapers getWallpapersBySlug(@PathVariable String slug){
        return wallpapersService.getWallpapersBySlug(slug);
    }
    @GetMapping("/api/articles/{id}")
    public Optional<Articles> getArticlesbyId(@PathVariable int id){
        return articlesService.getArticlesbyId(id);
    }
    @PostMapping("/api/add/about")
    public String AddAbouUs(@RequestBody AboutUs aboutUs){
        aboutUsSercive.saveAboutus(aboutUs);
        return "About Added ";
    }
    @PostMapping("/api/add/wallpapers")
    public String addWallpaper(@RequestBody Wallpapers wallpapers){
        wallpapersService.addWallpapers(wallpapers);
        return "Wallpaper Added";
    }
    @PostMapping("/api/add/articles")
    public String addArticles(@RequestBody Articles articles){
        articlesService.addArticles(articles);
        return "Articles Added";
    }
    @GetMapping("/api/about")
    public AboutUs getAboutUs(){
        return aboutUsSercive.getAboutUs();
    }
    @PutMapping("/api/update/articles")
    public String UpdateArticles(@RequestBody Articles articles){
        articlesService.updatetheArticlec(articles);
        return "Article Updated";
    }
    @DeleteMapping("/api/delete/wallpapers/{id}")
    public String deletewallpapers(@PathVariable int id){
        wallpapersService.deletewallpapers(id);
        return "Wallpaper Deleted";
    }
}
