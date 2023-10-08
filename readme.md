# Diseño de Sistemas 2023 - UTN FRD

Trabajo práctico, comunicación de frontend React con Backend Java y motor de base de datos MySQL dockerizado.

#### Pasos para su correcta ejecución:

- Abrimos Docker y ejecutamos el contenedor con la imagen <i>"cherckyto/dds-mysql:1.0"</i>
- Abrimos Eclipse y vamos a src/main/java/com.example.demo y ejecutamos <i>"DemoApplication.java"</i> como <i>"Java Application"</i>
- Configuramos el proxy abriendo una consola con privilegios de administrador y escribimos <i>"lcp --proxyUrl http://localhost:8080"</i>
- Finalmente vamos a la carpeta del frontend, abrimos una consola en esa ruta y ejecutamos <i>"npm start"</i>