package com.trifork.pip.scraper;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.IOException;

public class ObservationPoster {
    private static final String URL = "http://www.fugleognatur.dk/indtastobs.aspx";

    public void postObservation() {
        final WebClient webClient = new WebClient();
        final HtmlPage page;
        try {
            page = webClient.getPage(URL);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println(page.asText());

        webClient.closeAllWindows();
    }
}
