require('./bootstrap');
window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('homepage-buttons', require('./components/Homepage.vue').default);
Vue.component('game-window', require('./components/GameCanvas.vue').default);
Vue.component('forum-homepage', require('./components/ForumHomepage.vue').default);
Vue.component('forum-post-create', require('./components/ForumPostCreate.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '.main',
});
