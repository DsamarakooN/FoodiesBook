package com.colossal.foodies_backend.responce;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ApiResponse {
    private boolean success;
    private String message;

}
