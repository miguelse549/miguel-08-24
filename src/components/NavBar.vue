<template>
  <nav class="bg-blue-600 h-16 px-5">
    <ul class="flex items-center space-x-4 text-white tracking-widest h-full">
      <li>
        <router-link to="/">
          <img
            src="/public/pokeball_icon.svg"
            alt="Pokeball Icon"
            class="w-16 inline-block mr-2"
          />
        </router-link>
      </li>
      <li>
        <router-link
          to="/"
          class="px-3 py-2 rounded-md transition-colors duration-300 hover:bg-blue-800"
          :class="{ 'bg-red-500 font-bold h-fi': $route.path === '/' }"
        >
          Pokemons
        </router-link>
      </li>

      <li>
        <router-link
          to="/team"
          class="px-3 py-2 rounded-md transition-colors duration-300 hover:bg-blue-800"
          :class="{ 'bg-red-500 font-bold': $route.path === '/team' }"
        >
          Tu Equipo
        </router-link>
      </li>
    </ul>
  </nav>
</template>
