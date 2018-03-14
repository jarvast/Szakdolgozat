/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jarvast.app.jobs.service;

import jarvast.app.jobs.entity.Location;
import jarvast.app.jobs.entity.Worker;
import jarvast.app.jobs.repository.LocationRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author TomiPC
 */
@Service
public class LocationService {
    
    @Autowired
    private LocationRepository locationRepository;
    
    public List<Location> getLocationsByWorker(Worker worker){
        return locationRepository.findByWorker(worker);
    }

    List<Worker> searchByString(String input) {
        List<Location> asd = locationRepository.findPeopleDistinctBylocationNameContainingAllIgnoreCase(input);
        List<Worker> listo = new ArrayList<>();
        for (Location loc : asd){
            listo.add(loc.getWorker());
        }
        
    Set<Worker> hs = new HashSet<>();
    hs.addAll(listo);
    listo.clear();
    listo.addAll(hs);
        System.out.println("loc" + listo.toString());
        return listo;
    }
}
