package ninja.household.rs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

@Configuration
public class JacksonConfig {

	@Bean
	public Jackson2ObjectMapperFactoryBean jacksonObjectMapperFactory() {
		return new Jackson2ObjectMapperFactoryBean();
	}

	@Bean
	@DependsOn("jacksonObjectMapperFactory")
	public JacksonJsonProvider jsonProvider() {
		return new JacksonJsonProvider(jacksonObjectMapperFactory().getObject());
	}
}
