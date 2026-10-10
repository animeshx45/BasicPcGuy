package com.example.basicpcguy.Repository;
import com.example.basicpcguy.Models.Articles;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesRepo extends MongoRepository<Articles,Integer>{
}
