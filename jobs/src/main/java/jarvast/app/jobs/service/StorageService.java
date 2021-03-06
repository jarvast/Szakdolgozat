package jarvast.app.jobs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class StorageService {

    private final Path rootLocation = Paths.get("jobs/upload-dir");
    @Autowired
    private UserService userService;

    public void store(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(Objects.requireNonNull(file.getOriginalFilename())), StandardCopyOption.REPLACE_EXISTING);
            String extension = "";
            int i = file.getOriginalFilename().lastIndexOf('.');
            if (i > 0) {
                extension = file.getOriginalFilename().substring(i + 1);
            }
            String prefix = userService.getLoggedInUserName();
            String newFileName = prefix + "." + extension;

            String old = userService.getImg();

            if (old.equals(newFileName)) {
                Files.move(this.rootLocation.resolve(file.getOriginalFilename()), this.rootLocation.resolve(file.getOriginalFilename()).resolveSibling(newFileName), StandardCopyOption.REPLACE_EXISTING);
            } else {

                String defaultFileName = "default.jpg";
                if (!old.equals(defaultFileName)) {
                    Files.deleteIfExists(this.rootLocation.resolve(old));
                }
                userService.updateImg(newFileName);
                Files.move(this.rootLocation.resolve(file.getOriginalFilename()), this.rootLocation.resolve(file.getOriginalFilename()).resolveSibling(newFileName), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (Exception e) {
            throw new RuntimeException("Fail with storage!");
        }
    }

    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }
}
