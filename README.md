# Prueba Técnica

Esta prueba fue desarrollada para demostrar el manejo de Vue 3, Vue Router, Pinia, Tailwind CSS y TypeScript.

## Repositorio y Despliegue

- [Repositorio](https://github.com/miguelse549/miguel-08-24)

- [Despliegue Proyecto](https://66e835abef4f4a4661f870ac--unrivaled-fudge-b42530.netlify.app/)

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/miguelse549/miguel-08-24.git
```

2. Instala las dependencias:

```bash
npm install
```

## Uso

Ejecuta el proyecto con el siguiente comando:

```bash

npm  run  dev

```

Flujo del la interfaz grafica

El proyecto está compuesto por tres vistas principales. La primera muestra los primeros 151 Pokémon de la PokéAPI, cargándolos de manera progresiva. Desde esta vista, el usuario puede seleccionar hasta 6 Pokémon para formar su equipo. Estos se visualizarán en la segunda vista, llamada "Tu equipo", donde se puede eliminar un Pokémon del equipo o acceder a la vista de detalles. En esta tercera vista, se permite la edición de algunos datos del Pokémon seleccionado.

## Estructura del Proyecto

```bash
src/
├── assets/
│   └── vue.svg
│
├── components/
│   ├── Card.vue
│   ├── Loading.vue
│   ├── Modal.vue
│   ├── NavBar.vue
│   ├── Notification.vue
│   └── Stat.vue
│
├── composables/
│   ├── usePlayCry.ts
│   ├── useStats.ts
│   └── useTranslations.ts
│
├── router/
│   └── index.ts
│
├── services/
│   ├── api.ts
│   └── interfaces.ts
│
├── stores/
│   └── team.ts
│
├── views/
│   ├── Home.vue
│   ├── PokemonDetail.vue
│   └── Team.vue
│
├── App.vue
├── index.css
├── main.ts
```

## Tecnologías Utilizadas

Este proyecto utiliza el siguiente stack de desarrollo:

- [Vue 3 (script setup)](https://vuejs.org/)

- [Pinia](https://pinia.vuejs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [Vite](https://vitejs.dev/)

- [Tailwind CSS](https://tailwindcss.com/)

- [Vue Router 4](https://router.vuejs.org/)
