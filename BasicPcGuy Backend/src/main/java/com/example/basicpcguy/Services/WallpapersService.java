package com.example.basicpcguy.Services;
import com.example.basicpcguy.Models.Wallpapers;
import com.example.basicpcguy.Repository.WallpapersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WallpapersService {
    private final WallpapersRepo wallpapersRepo;
    @Autowired
    public WallpapersService(WallpapersRepo wallpapersRepo) {
        this.wallpapersRepo = wallpapersRepo;
    }
    public List<Wallpapers> getWallpapers() {
        return wallpapersRepo.findAll();
    }
    public Wallpapers getWallpapersBySlug(String slug) {
        return (Wallpapers) wallpapersRepo.findBySlug(slug);
    }

    public void addWallpapers(Wallpapers wallpapers) {
        wallpapersRepo.save(wallpapers);
    }
    public void deletewallpapers(int id) {
        wallpapersRepo.deleteById(id);
    }
}
