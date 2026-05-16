# Squadness Design System — Bootstrap 5

Capa de estilos CSS sobre **Bootstrap 5** que implementa los tokens de diseño Squadness.
Compatible con cualquier backend — **PHP, Laravel, Django, Rails** — sin dependencias de JavaScript frameworks.

## Estructura

```
squadness-bootstrap/
├── src/
│   ├── tokens/
│   │   └── tokens.css        ← --sq-* custom properties + override de --bs-*
│   ├── components/           ← (Fase 3) snippets HTML por componente
│   ├── overrides/            ← (Fase 3) CSS adicional por componente si se requiere
│   └── squadness.css         ← Capa principal: estilos de componentes sobre Bootstrap
├── docs/
│   ├── index.html            ← Demo interactivo de todos los componentes
│   └── assets/               ← Imágenes y recursos del sitio docs
├── dist/                     ← (Fase 5) Archivos compilados/minificados para producción
└── README.md
```

## Inicio rápido

Incluye los tres archivos en este orden en el `<head>` de tu página HTML/PHP:

```html
<!-- 1. Tokens Squadness (--sq-* y override --bs-*) -->
<link rel="stylesheet" href="squadness/tokens.css" />

<!-- 2. Bootstrap 5 CDN -->
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />

<!-- 3. Componentes y estilos Squadness -->
<link rel="stylesheet" href="squadness/squadness.css" />
```

## Uso en PHP

```php
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= $title ?></title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/squadness/tokens.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/assets/squadness/squadness.css" />
</head>
<body>

  <?php include 'partials/navbar.php'; ?>

  <div class="container py-4">
    <!-- Tu contenido PHP aquí usando clases Bootstrap + Squadness -->
    <div class="card">
      <div class="card-header">Usuarios</div>
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <!-- ... -->
        </table>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## Plan de fases

| Fase | Contenido | Estado |
|------|-----------|--------|
| **1** | Estructura del repositorio + tokens.css + squadness.css + demo index.html | ✅ Completo |
| **2** | Mapeo completo Bootstrap 5 vars — componentes, tipografia, semanticos | ✅ Completo |
| **3** | 22 componentes como HTML snippets en src/components/ | ✅ Completo |
| **4** | Sitio de documentación estático multi-página | ✅ Completo |
| **5** | Guía de integración PHP + dist/ compilado | ✅ Completo |

## Tokens disponibles

Los tokens se definen en `src/tokens/tokens.css` como CSS custom properties `--sq-*`.
Al incluir este archivo **antes** de Bootstrap, las variables `--bs-*` también se sobreescriben
automáticamente para que todo Bootstrap adopte la paleta Squadness.

Ver documentación completa de tokens en `docs/index.html`.

## Componentes disponibles (src/components/)

Cada archivo `.html` contiene snippets copy-paste listos para usar en PHP/HTML.
Incluyen múltiples variantes, estados y casos de uso reales.

| Archivo | Variantes incluidas |
|---------|---------------------|
| `button.html` | Primary, outline, secondary, danger, tamaños, loading, grupos |
| `badge.html` | Todos los estados, con contador, inline, en tablas |
| `checkbox.html` | Básico, marcado, deshabilitado, grupos, inline |
| `radio-button.html` | Grupos, inline, con descripción, estilo tarjeta |
| `switch.html` | On/off, deshabilitado, grupo de preferencias |
| `input.html` | Texto, email, password, con ícono, validación, número, fecha |
| `textarea.html` | Básico, contador de caracteres, error, deshabilitado |
| `select.html` | Simple, preseleccionado, tamaños, error, múltiple |
| `card.html` | Básica, métrica KPI, perfil usuario, grid responsive, con form |
| `table.html` | Básica, con toolbar de acciones, paginación integrada |
| `pagination.html` | Básica, con puntos, pequeña, con info de registros |
| `modal.html` | Confirmación, destructivo, con formulario, informativa |
| `alert.html` | Variantes, con ícono, descartable, banner, lista de errores |
| `toast.html` | Éxito, error, advertencia, simple, con botones de disparo |
| `tooltip.html` | Posiciones, en íconos, en etiquetas, en badges |
| `popover.html` | Básico, HTML enriquecido, confirmación rápida, ícono de ayuda |
| `navbar.html` | TopBar completo con búsqueda y usuario, minimalista |
| `sidebar.html` | Layout desktop+móvil, offcanvas, items individuales |
| `accordion.html` | Panel único activo, paneles independientes, con formulario |
| `progress.html` | Básico, con etiqueta, colores semánticos, animado, stacked |
| `spinner.html` | Tipos, tamaños, en botón, overlay de página, overlay de card |
| `drag-drop.html` | Dropzone de archivos, lista reordenable con HTML5 API |

## Producción — dist/

Para producción usa el bundle compilado en `dist/`:

```html
<!-- Solo 1 archivo Squadness — 25 KB minificado -->
<link rel="stylesheet" href="/assets/dist/squadness-bootstrap.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
```

| Archivo | Tamaño | Descripción |
|---------|--------|-------------|
| `dist/squadness-bootstrap.css` | 44 KB | Bundle completo sin minificar |
| `dist/squadness-bootstrap.min.css` | 25 KB | Bundle minificado para producción |

Para regenerar los archivos `dist/` después de modificar tokens o estilos:

```bash
python3 scripts/build.py
```
