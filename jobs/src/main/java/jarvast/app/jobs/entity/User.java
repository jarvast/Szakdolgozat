package jarvast.app.jobs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity(name = "User")
@DiscriminatorValue("User")
public class User extends BaseUser {

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String phoneNum;

    @ManyToOne(targetEntity = Location.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany(
            mappedBy = "sender",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<Rating>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_favorites",
            joinColumns = {
                    @JoinColumn(name = "user_id", updatable = false)},
            inverseJoinColumns = {
                    @JoinColumn(name = "worker_id", updatable = false)}
    )
    @JsonIgnore
    private List<Worker> favorites = new ArrayList<Worker>();

    public User(String email, String name, String phoneNum, Location location) {
        this.email = email;
        this.name = name;
        this.phoneNum = phoneNum;
        this.location = location;
    }

    public User() {
    }

    public List<Worker> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Worker> favorites) {
        this.favorites = favorites;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "User{" + "email=" + email + ", name=" + name + ", phoneNum=" + phoneNum + ", location=" + location + "" + this.getUsername() + " " + "}";
    }

}
