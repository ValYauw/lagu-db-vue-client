import { createRouter, createWebHistory } from 'vue-router';
import navigationGuard from '../plugins/navigation-guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/genres',
      name: 'genres',
      component: () => import('../views/GenresView.vue')
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('../views/SongsView.vue')
    },
    {
      path: '/artists',
      name: 'artists',
      component: () => import('../views/ArtistsView.vue')
    },
    {
      path: '/genres/:id',
      name: 'genre',
      props: true,
      component: () => import('../views/GenreDetailView.vue')
    },
    {
      path: '/songs/:id',
      name: 'song',
      props: true,
      component: () => import('../views/SongDetailView.vue')
    },
    {
      path: '/artists/:id',
      name: 'artist',
      props: true,
      component: () => import('../views/ArtistDetailView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('../views/NotFound.vue')
    }
  ]
})

router.beforeEach(navigationGuard);

export default router;
