package com.ecommerce.ecommerce_backend.service;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

@Service
public class ImageService {

    public byte[] processImage(MultipartFile file) throws Exception {
        InputStream is = new ByteArrayInputStream(file.getBytes());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(is)
                .size(800, 800)
                .keepAspectRatio(true)
                .outputFormat("png")
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }
}