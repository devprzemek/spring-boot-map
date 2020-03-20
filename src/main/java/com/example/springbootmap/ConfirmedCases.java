package com.example.springbootmap;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;


@Service
public class ConfirmedCases {
    private static final String COVID19_CONFIRMED_URI = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv";

    private final DataRepo dataRepo;

    public ConfirmedCases(DataRepo dataRepo) {
        this.dataRepo = dataRepo;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadData() throws IOException, InterruptedException {
        HttpClient httpClient = HttpClient.newHttpClient();
        HttpRequest httpRequest = HttpRequest.newBuilder().uri(URI.create(COVID19_CONFIRMED_URI)).build();
        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        StringReader stringReader = new StringReader(httpResponse.body());
        CSVParser parser = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(stringReader);

        LocalDate today = LocalDate.now();
        String dateFormat = today.minusDays(1).format(DateTimeFormatter.ofPattern("M/dd/yy"));

        for(CSVRecord record : parser){
            String country = record.get("Country/Region");
            if(country.equals("US")){
                String stateName = record.get("Province/State");
                int cases = Integer.parseInt(record.get(dateFormat));

                if(!stateName.contains(","))
                dataRepo.add(stateName, cases);
            }
        }
    }
}
