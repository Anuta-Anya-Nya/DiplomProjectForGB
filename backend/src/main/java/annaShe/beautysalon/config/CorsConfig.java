package annaShe.beautysalon.config;

import annaShe.beautysalon.entity.*;
import annaShe.beautysalon.env.SettingsApp;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class CorsConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(User.class); //получать id из contacts
        config.exposeIdsFor(Master.class);
        config.exposeIdsFor(GroupService.class);
        config.exposeIdsFor(Service.class);
        config.exposeIdsFor(Appointment.class);
        cors.addMapping(config.getBasePath()+ "/**")
                .allowedOrigins(SettingsApp.getHOST()) //с какого url можно к нам обращаться
                .allowedMethods("GET", "POST", "DELETE") //какими http методами можно польоваться
                .allowCredentials(true); //можно передавать куки в авторицации через core запросы
    }
}
