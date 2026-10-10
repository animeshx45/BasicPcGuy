package com.example.basicpcguy.Services;
import com.example.basicpcguy.Models.AboutUs;
import com.example.basicpcguy.Repository.AboutUsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AboutUsSercive {
    private final AboutUsRepo aboutUsRepo;
    @Autowired
    public AboutUsSercive(AboutUsRepo aboutUsRepo) {
        this.aboutUsRepo = aboutUsRepo;
    }
    public void saveAboutus(AboutUs aboutUs) {
        aboutUsRepo.save(aboutUs);
    }
    public AboutUs getAboutUs() {
        return (AboutUs) aboutUsRepo.findAll();
    }
}
