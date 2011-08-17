package com.trifork.pip.rest;

import com.trifork.pip.scraper.ObservationPoster;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

@Path("/observation")
public class ObservationResource {
    @POST
    public String createObservation() {
        return "Done";
    }

    @GET
    public String test() {
        new ObservationPoster().postObservation();
        return "Done";
    }
}
