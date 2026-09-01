# Batch Final — Fase 3: bloqueantes del preview

## Corrección aceptada, sobre mi reporte anterior

Confirmado: el selector de idioma SÍ existe en móvil/tablet. Hay **dos** switchers en `Header.tsx` — uno de escritorio (`id="lang-switcher-*"`, línea 105, `hidden xl:flex`, visible ≥1280px) y un "Compact Language Switcher" sin `id` (línea 135-153, `flex xl:hidden`, visible <1280px, junto al hamburguesa). Mi script de Fase 2 solo buscaba por el `id` del switcher de escritorio, que en efecto está oculto por debajo de 1280px — nunca revisé si existía una alternativa. Corregido el método de verificación para el resto de esta fase.

---

## 3a — Overflow del header en anchos intermedios (CONFIRMADO Y CORREGIDO)

### Diagnóstico

Medí `scrollWidth` vs `clientWidth` de la barra de navegación principal del header, en 375/390/640/768/820/1024/1280/1440px × 3 idiomas.

**Desbordaba en 375, 390 y 640px, en los 3 idiomas.** Dejaba de desbordar exactamente en 768px en adelante.

Causa identificada: dos hijos flex con `shrink-0` (no pueden achicarse) compitiendo por el mismo espacio — el logo/marca (`<a id="header-logo-link">`, con nombre + tagline) y el contenedor de controles compactos (switcher + botón de llamada + CTA + hamburguesa). Los botones de llamada y CTA rápidos tenían `hidden sm:inline-flex`, es decir aparecían a partir de 640px — justo el ancho donde el desborde era peor (hasta 80px de más).

La hipótesis del francés/español rompiendo "antes" que el inglés **no se confirmó con los datos**: el inglés tiene la columna de marca más ancha de los 3 (298px vs 278px FR vs 270px ES a 640px), por el tagline en inglés siendo más largo. El desborde ocurre en los 3 por igual, pero EN es el más ajustado, no el que mejor entra.

### Arreglo (ocultando por breakpoint, sin achicar fuentes ni truncar)

- `Header.tsx`: tagline (`header.tagline`) ahora `hidden sm:block` — no se muestra por debajo de 640px.
- `Header.tsx`: botón de llamada rápida y botón de reserva rápida (ambos dentro del contenedor compacto) pasaron de `hidden sm:inline-flex` a `hidden lg:inline-flex` — ya no aparecen hasta 1024px, ancho donde confirmé que sí hay lugar. Siguen disponibles igual en el drawer del menú hamburguesa en todos los anchos.

### Verificación post-fix

`barOverflow: false` en los 8 anchos probados (375 a 1440px), en los 3 idiomas — sin excepción. `tsc --noEmit` limpio.

---

## 3b — Disclaimer de la sticky bar (aplicado según tu decisión)

Cambiado `hidden md:flex` → `hidden xl:flex` en el `<div>` del disclaimer dentro de `StickyBookingBar.tsx`. Sin campos nuevos.

Verificado en 768/820/1024/1280px × 3 idiomas:

| Ancho | Disclaimer visible | CTA 100% dentro del viewport |
|---|---|---|
| 768px | No | Sí |
| 820px | No | Sí |
| 1024px | No | Sí |
| 1280px | Sí | Sí |

`tsc --noEmit` limpio.

---

## 3c — Barrido general (read-only, nada modificado en esta sección)

### Errores de consola
**Ninguno**, en ningún locale, a 375/768/1440px. Sin errores de red (`4xx`/`5xx`) en las requests de la página, salvo el favicon (ver más abajo).

### Overflow horizontal
- Header: resuelto en 3a.
- Residual: **~1px** de overflow de página completa a 375/390px (`scrollWidth` 376/391 vs viewport 375/390), en los 3 idiomas. Identificado el origen: un `div` decorativo con `-rotate-1` (transform) detrás de la foto en AboutJitany — artefacto de redondeo de sub-píxel de la transformación CSS, no un desborde real de contenido. Sin scrollbar visible, sin impacto visual. No lo toqué — no es lo que causaba el problema del header, son dos cosas distintas como preguntaste.
- 768px y 1440px: sin overflow en ningún locale.

### Imágenes rotas o sin alt
Ninguna encontrada en los 3 anchos × 3 idiomas.

### Links muertos (`href="#"`) — CORREGIDO

Uno encontrado: **`header-logo-link`** (el nombre/logo "KinéLibelula" en el header), `href="#"`.

Corregido según tu indicación — la landing es de una sola página, así que apuntar a `/` habría recargado toda la app para llegar al mismo lugar donde el usuario ya está. En su lugar:

1. Agregado `id="top"` al `<section>` del Hero (`Hero.tsx`) — era la única sección sin id (las demás lo recibieron en Batch Final 2).
2. `header-logo-link` ahora usa `href="#top"`.
3. No hizo falta ninguna regla CSS nueva — el selector `section[id]` en `index.css:36` ya aplica `scroll-margin-top` a cualquier sección con id, incluida la nueva.

Verificado en los 3 idiomas: clic en el logo desde el fondo de la página, esperando a que el scroll suave se asiente por completo (en una página larga no alcanza con esperar ~1s, el scroll sigue en curso) → llega a `scrollY: 0` (es la primera sección, no puede scrollear más arriba) con el `<h1>` del hero en `top: 232px`, muy por debajo del borde inferior del header (`114px`) — sin tapar nada, en EN/FR/ES.

### Los 6 anchors de header y footer, en los 3 locales
Verificado programáticamente que los 6 (`#services`, `#pricing`, `#pregnancy`, `#about`, `#faq`, `#contact`) resuelven a una sección real del DOM, tanto en el header como en el footer, en EN/FR/ES. Sin anchors rotos.

### Strings que quedan en francés cuando el locale es EN o ES

Más allá de los 4 casos ya encontrados en batches anteriores, encontré y **confirmé visualmente en pantalla** (no solo en el código):

| String | Archivo:línea | Visible en | Confirmado en pantalla |
|---|---|---|---|
| `"Appeler"` | `Header.tsx:163` | Botón de llamada rápida, <768px | Sí — EN y ES muestran "Appeler" literal |
| `"Appeler le {phone}"` | `Header.tsx:213` | Drawer del menú móvil | Sí — EN y ES muestran "APPELER LE 514-746-5381" literal |
| `title="Appeler le cabinet"` | `Header.tsx:159` | Atributo `title`, no texto visible | No verificado en pantalla (es metadata, no texto renderizado) |
| `aria-label="Choisir la langue ${lang.label}"` | `Header.tsx:147` | Screen readers | No visible en pantalla |
| `aria-label="Ouvrir le menu de navigation"` | `Header.tsx:179` | Screen readers | No visible en pantalla |
| `title` del iframe del mapa | `Contact.tsx:61` | Accesibilidad, no texto visible | No visible en pantalla |
| Múltiples strings (aria-labels, placeholders, "Appeler au...") | `BookingModal.tsx` | Formulario de reserva | Catalogado completo en Fase 4, no repetido acá |

`Header.tsx` no es uno de los tres componentes nombrados para el inventario de Fase 4 (BookingModal/CookieBanner/LegalModal) — lo sumo acá porque cae directamente en lo que pediste para 3c.

### Inventario de valores `[PENDIENTE...]` visibles en pantalla hoy

Confirmado por lectura directa del DOM renderizado (no solo del contenido de WP) — esto es lo que la clienta va a ver si visita la página ahora mismo:

| Sección | EN | FR | ES |
|---|---|---|---|
| Process, paso 2 | `[PENDIENTE]` | `Réponse en général la même journée · [Por Confirmar]` | `[PENDIENTE - Plazo Real]` |
| About, párrafo 2 (formación) | `...l'Académie de massage scientifique [PENDIENTE: year]...` | `...l'Académie de massage scientifique [PENDIENTE: année]...` | `...l'Académie de massage scientifique [PENDIENTE: año]...` |
| About, credencial de coaching | `[Coaching Credential — PENDIENTE]` | `[PENDIENTE — ver nota abajo. Recomiendo dejar el campo vacío.]` | `[PENDIENTE — ver nota abajo. Recomiendo dejar el campo vacío.]` |
| About, insignia #4 (años de experiencia) | **No visible** (ver nota abajo) | `25+ ans [PENDIENTE: ver nota]` | `25+ años [PENDIENTE: ver nota]` |
| About/Certificaciones, tarjeta 1 (asociación) | `[Académie de massage scientifique, Montréal — PENDIENTE]` | `Académie de massage scientifique, Montréal [PENDIENTE: nom officiel exact + année]` | `Académie de massage scientifique, Montréal [PENDIENTE: nom officiel + année]` |
| Certificaciones, tarjeta 2 (asociación) | `[PENDIENTE: nom exact + n° de membre. Piste : RMPQ...]` | mismo texto | `[PENDIENTE: nom exact + n° de membre. Piste : RMPQ]` |
| Certificaciones, tarjeta 3 (asociación) | `[PENDIENTE: formation suivie — école, année...]` | mismo texto | `[PENDIENTE: école + année]` |
| Pricing, plan 90 min, feature 4 | `Time to rest and herbal tea at the end [PENDIENTE]` | **Completo, sin PENDIENTE** (`Temps de repos et tisane à la fin`) | `Tiempo de descanso e infusión al final [PENDIENTE]` |
| Pricing, nota al pie | `...Cancellation: [PENDIENTE]` | `...Annulation : [PENDIENTE: délai à confirmer avec Jitany]` | `...Cancelación: [PENDIENTE]` |
| Pricing, nota de pago | `...· [PENDIENTE: taxes?]` | `...· [PENDIENTE: taxes incluses ou en sus ?]` | `...· [PENDIENTE: impuestos?]` |
| Footer, copyright | `...Jitany Jara [PENDIENTE]. All rights reserved.` | `...Jitany Jara [PENDIENTE: raison sociale + NEQ]. Tous droits réservés.` | `...Jitany Jara [PENDIENTE]. Todos los derechos reservados.` |
| FAQ, pregunta 2 (contacto) — requiere expandir el acordeón | `...Sessions are by appointment only. [PENDIENTE]` | `...seulement. <strong>[PENDIENTE: ajouter Messenger/WhatsApp...]</strong>` | `...cita previa. [PENDIENTE]` |
| FAQ, pregunta 7 (seguros) — requiere expandir | `...member of [PENDIENTE] and I give you...` | `...membre de <strong>[PENDIENTE: nom exact...]</strong> et...` | `...miembro de [PENDIENTE] y te entrego...` |
| FAQ, pregunta 8 (precios/cancelación) — requiere expandir | `...[PENDIENTE: taxes?]. Payment on site [PENDIENTE: methods]...[PENDIENTE: notice]...` | `...<strong>[PENDIENTE: taxes incluses...]</strong>...<strong>[PENDIENTE: modes acceptés...]</strong>...<strong>[PENDIENTE: délai]</strong>...` | equivalente sin `<strong>` |

**Nota — insignia de About oculta solo en EN:** en `AboutJitany.tsx` hay un filtro que oculta insignias cuyo texto es *solo* corchetes (`/^\[.*\]$/`). En EN, el campo `aboutStatValue` de esa insignia es `null`, así que el texto queda como únicamente `"[PENDIENTE: ver nota]"` → el filtro lo esconde. En FR/ES, `aboutStatValue` sí tiene contenido (`"25+ ans"` / `"25+ años"`), así que el texto combinado no empieza con `[` y el filtro lo deja pasar → se ve en pantalla. Es una inconsistencia de contenido entre idiomas, no un bug de código — no lo toqué.

**Nota — feature de Pricing completa solo en FR:** confirmado por consulta directa a WP que el campo `planFeatureText` del plan de 90 min, ítem 4, está completo en francés (`"Temps de repos et tisane à la fin"`, sin corchetes) pero incompleto en EN y ES. Contenido de WP, no de código.

**Hallazgo nuevo — HTML crudo visible en FAQ (FR)**: confirmé en pantalla que la pregunta 8 del FAQ en francés muestra literalmente las etiquetas `<strong>` y `</strong>` como texto, no como negrita. Es el bug ya señalado en sesiones anteriores ("`FAQ.tsx` renderiza `{item.answer}` como texto plano, no `dangerouslySetInnerHTML`") — antes era una advertencia teórica, ahora está **confirmado como síntoma real y visible** en el contenido actual de WP. Solo pasa en FR porque es la única versión que además de `[PENDIENTE...]` tiene el markup `<strong>` alrededor.

### Favicon

**Actualizado** — se agregaron los archivos a `public/favicon/` (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`, `site.webmanifest`). Reverifiqué en vivo:

- `GET /favicon/favicon.ico` → **200**, se sirve correctamente.
- `GET /favicon.ico` (la ruta que el navegador prueba por defecto cuando no hay `<link rel="icon">` declarado) → **sigue en 404**.
- `index.html` sigue sin ningún `<link rel="icon">` — nada apunta el navegador hacia `/favicon/`.

El 404 original persiste por una causa distinta a la que pensé al principio: no era que faltaran los archivos, es que faltan (y siguen faltando) las etiquetas `<link>` en `<head>` que los declaren. Es un fix de una sola pasada en `index.html` (agregar `<link rel="icon">`, `<link rel="apple-touch-icon">`, `<link rel="manifest">` apuntando a `/favicon/...`), pero no lo hice — esta fase es solo diagnóstico. Queda listo para Fase 4 o para que me digas que lo aplique.

### Hallazgo adicional, no pedido

`index.html:2` tiene `<html lang="fr">` fijo — nunca se actualiza al cambiar de idioma con el switcher (React solo cambia el contenido, no el atributo `lang` del documento). Afecta accesibilidad (lectores de pantalla) y SEO, no es visible para un usuario vidente. Lo anoto, no lo toqué — no estaba pedido.

---

## Estado

STOP — esperando confirmación antes de Fase 4 (inventario read-only de BookingModal, CookieBanner, LegalModal).
