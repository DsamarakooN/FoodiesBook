package com.colossal.foodies_backend.config;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationProperties {
    private String tokenSecret;
    private long tokenExpirationMsec;
}
