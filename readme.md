# Diseño de Sistemas 2023 - UTN FRD

Trabajo práctico, diseño y comunicación de frontend React con backend Java y base de datos MySQL dockerizada.

Todo el contenido de la carpeta 'backend' fue provisto por la cátedra.

La aplicación está disponible integrada en el backend como un contenedor de Docker en [Docker Hub](https://hub.docker.com/r/tdominguez33/dds-2023).

#### Pasos para ejecución en desarrollo:

- Abrimos Docker y ejecutamos el contenedor con la imagen <i>"cherckyto/dds-mysql:1.0"</i>
- Abrimos Eclipse y vamos a src/main/java/com.example.demo y ejecutamos <i>"DemoApplication.java"</i> como <i>"Java Application"</i>
- Configuramos el proxy abriendo una consola con privilegios de administrador y escribimos:
```
lcp --proxyUrl http://localhost:8080
```
- Finalmente vamos a la carpeta del frontend, abrimos una consola en esa ruta y ejecutamos:
```
npm start
```
