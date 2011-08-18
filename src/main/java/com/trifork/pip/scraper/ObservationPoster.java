package com.trifork.pip.scraper;

import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

public class ObservationPoster {
    private final WebClient webClient = new WebClient();
    public static final String BASE_URL = "http://www.fugleognatur.dk";
    private static final String LOGIN_URL = BASE_URL + "/login.asp";
    private static final String POST_OBSERVATION_URL = BASE_URL + "/indtastobs.aspx";

    public ObservationPoster() {
        webClient.setRedirectEnabled(true);
        webClient.setCssEnabled(false);
        webClient.setActiveXNative(false);
        login();
    }

    private void login() {
        try {
            HtmlPage loginPage = webClient.getPage(LOGIN_URL);

            FileUtils.writeStringToFile(new File("/Users/jakob/tmp/beforelogin.html"), loginPage.asXml());

            HtmlForm loginForm = loginPage.getFormByName("frmLogin2");
            HtmlInput username = loginForm.getInputByName("box1");
            HtmlInput password = loginForm.getInputByName("box2");
            HtmlButtonInput submitBtn = loginForm.getInputByName("btnSubmit2");

            username.setValueAttribute("jakobfaerch");
            password.setValueAttribute("46n12b");

            HtmlPage afterLogin = submitBtn.click();

            FileUtils.writeStringToFile(new File("/Users/jakob/tmp/afterlogin.html"), afterLogin.asXml());

            webClient.closeAllWindows();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void postObservation() {
        try {
            webClient.setJavaScriptEnabled(false);
            final HtmlPage page;
            page = webClient.getPage(POST_OBSERVATION_URL);

            FileUtils.writeStringToFile(new File("/Users/jakob/tmp/observationpage.html"), page.asXml());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        webClient.closeAllWindows();
    }
}
