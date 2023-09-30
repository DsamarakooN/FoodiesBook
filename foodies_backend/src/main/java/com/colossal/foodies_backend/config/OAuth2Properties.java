package com.colossal.foodies_backend.config;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class OAuth2Properties {
    private List<String> authorizedRedirectUris = new ArrayList<>();

    public OAuth2Properties authorizedRedirectUris(List<String> authorizedRedirectUris) {
        this.authorizedRedirectUris = authorizedRedirectUris;
        return this;
    }
}
