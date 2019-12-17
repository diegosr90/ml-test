## Mercado Libre Frontend Test

### Descripción
El repo contiene una web app hecha con React. Contiene 3 rutas navegables: 
### Sitemap
 - Home (/). Contiene una caja de búsqueda, la cual consulta la API de Search de ML. Una vez conseguido resultados, redirecciona a la vista de Items.
 - Items (/items). Muestra un listado de 4 productos, al clickear en alguno de ellos se redirecciona a la vista de Item.
 - Item (/item/:id). Es el detalle completo del item seleccionado en la vista Items.

### Arquitectura
Uno de los objetivos de esta aplicación fue tener en cuenta SEO, así se diseñó para que contemple Server-side Rendering (SSR) usando Express como web server, Webpack como compilador de bundles. En cuanto al desarrollo, se usa Typescript. Para estilos SASS, utilizando como framework de estilos Bootstrap.