package com.example.basicpcguy.Repository;

import com.example.basicpcguy.Models.AboutUs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutUsRepo extends MongoRepository<AboutUs,Integer> {
}
