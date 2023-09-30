package com.colossal.foodies_backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@ConfigurationProperties(prefix = "app")
public class ApplicationProperties {
    private final AuthenticationProperties auth = new AuthenticationProperties();
    private final OAuth2Properties oauth2 = new OAuth2Properties();

    public AuthenticationProperties getAuth() {
        return auth;
    }

    public OAuth2Properties getOauth2() {
        return oauth2;
    }

}
