package com.example.basicpcguy.Repository;
import com.example.basicpcguy.Models.Wallpapers;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WallpapersRepo extends MongoRepository<Wallpapers,Integer> {
    Object findBySlug(String slug);
}
