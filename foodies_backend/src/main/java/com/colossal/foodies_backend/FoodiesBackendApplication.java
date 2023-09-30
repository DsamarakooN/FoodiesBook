package com.colossal.foodies_backend;

//import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.web.servlet.FilterRegistrationBean;
// import org.springframework.context.annotation.Bean;

// import com.colossal.foodies_backend.filters.CorsFilter;

@SpringBootApplication
public class FoodiesBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodiesBackendApplication.class, args);
	}

// 	@Bean
// public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
//     FilterRegistrationBean<CorsFilter> registration = new FilterRegistrationBean<>();
//     registration.setFilter(new CorsFilter());
//     registration.addUrlPatterns("/*");
//     return registration;
// }
}