package com.trifork.pip.rest;

import com.trifork.pip.model.Expedition;
import com.trifork.pip.scraper.ObservationPoster;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.Date;

@Path("/observation")
public class ObservationResource {
    @POST
    public String createObservation() {
        return "Done";
    }

    @GET
    public String test() {
        Expedition exp = new Expedition();
        exp.reporter = "Jakob Færch";
        exp.comment = "Test";
        exp.observationdate = new Date();
        exp.location = "12.34,34.45";


        new ObservationPoster().postObservation(exp);
        return "Done";
    }
}
