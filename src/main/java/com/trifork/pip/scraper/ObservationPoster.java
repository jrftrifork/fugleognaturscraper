package com.trifork.pip.scraper;

import com.gargoylesoftware.htmlunit.IncorrectnessListener;
import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.ScriptException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;
import com.gargoylesoftware.htmlunit.javascript.JavaScriptErrorListener;
import com.trifork.pip.model.Expedition;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;

public class ObservationPoster {
    private final WebClient webClient = new WebClient();
    public static final String BASE_URL = "http://www.fugleognatur.dk";
    private static final String LOGIN_URL = BASE_URL + "/login.asp";
    private static final String POST_OBSERVATION_URL = BASE_URL + "/indtastobs.aspx";

    public ObservationPoster() {
        webClient.setRedirectEnabled(true);
        webClient.setCssEnabled(false);
        webClient.setActiveXNative(false);
        webClient.setIncorrectnessListener(new IncorrectnessListener() {
            @Override
            public void notify(String message, Object origin) {
                System.err.println(message);
            }
        });
        webClient.setJavaScriptErrorListener(new JavaScriptErrorListener() {
            @Override
            public void scriptException(HtmlPage htmlPage, ScriptException scriptException) {
                System.err.println(scriptException);
            }

            @Override
            public void timeoutError(HtmlPage htmlPage, long allowedTime, long executionTime) {
                System.err.println("timeoutError");
            }

            @Override
            public void malformedScriptURL(HtmlPage htmlPage, String url, MalformedURLException malformedURLException) {
                System.err.println("malformedScriptURL");
            }

            @Override
            public void loadScriptError(HtmlPage htmlPage, URL scriptUrl, Exception exception) {
                System.err.println("loadScriptError "+ scriptUrl + " " + exception.getMessage());
            }
        });

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

    public void postObservation(Expedition expedition) {
        try {
            webClient.setJavaScriptEnabled(false);
            final HtmlPage page;
            page = webClient.getPage(POST_OBSERVATION_URL);

            HtmlForm form = page.getFormByName("aspnetForm");

            FileUtils.writeStringToFile(new File("/Users/jakob/tmp/observationpage.html"), page.asXml());

            form.getInputByName("ctl00$ContentPlaceHolder1$ArtID01").setValueAttribute("529");
            form.getInputByName("ctl00$ContentPlaceHolder1$antal01").setValueAttribute("113");
            form.getInputByName("ctl00$ContentPlaceHolder1$art01").setValueAttribute("Solsort (id:529)");

            String dateFormatted = new SimpleDateFormat("dd-MM-yyyy").format(expedition.observationdate);
            form.getInputByName("ctl00$ContentPlaceHolder1$DatoTextBox").setValueAttribute(dateFormatted);

            form.getTextAreaByName("ctl00$ContentPlaceHolder1$ObservatoerTextBox").setText(expedition.reporter);

            form.getInputByName("ctl00$ContentPlaceHolder1$SenesteLokIDHiddenField").setValueAttribute("1057"); // hard coded location Brendstrup Enge

            HtmlSubmitInput submitBtn = form.getInputByName("ctl00$ContentPlaceHolder1$SendButton");
            HtmlPage confirmPage = submitBtn.click();

            FileUtils.writeStringToFile(new File("/Users/jakob/tmp/confirmpage.html"), confirmPage.asXml());

            System.out.println("********* Efter post");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        webClient.closeAllWindows();
    }
}
