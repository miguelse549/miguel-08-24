<template>
  <nav class="bg-blue-600 h-16 px-5 z-1 shadow-personalized">
    <ul class="flex items-center text-white tracking-widest h-full">
      <li>
        <router-link to="/">
          <img
            src="/pokeball_icon.svg"
            alt="Pokeball Icon"
            class="w-16 inline-block mr-2"
          />
        </router-link>
      </li>
      <li>
        <router-link
          to="/"
          class="py-2 transition-colors duration-1000 hover:border-b-4 hover:border-red-600 px-6 text-nowrap"
          :class="{
            'border-b-4  font-bold': $route.path === '/',
          }"
        >
          Pokemons
        </router-link>
      </li>

      <li>
        <router-link
          to="/team"
          class="py-2 transition-colors duration-1000 hover:border-b-4 hover:border-red-600 px-6 text-nowrap"
          :class="{ 'border-b-4  font-bold': $route.path === '/team' }"
        >
          Tu Equipo
        </router-link>
      </li>
    </ul>
  </nav>
</template>
