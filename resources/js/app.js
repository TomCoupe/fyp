require('./bootstrap');
window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('homepage-buttons', require('./components/Homepage.vue').default);
Vue.component('game-window', require('./components/GameCanvas.vue').default);
Vue.component('forum-homepage', require('./components/ForumHomepage.vue').default);
Vue.component('forum-post-create', require('./components/ForumPostCreate.vue').default);
Vue.component('forum-post-view', require('./components/ForumPostView.vue').default);
Vue.component('forum-comment-create', require('./components/ForumCommentCreate').default);
Vue.component('leaderboards', require('./components/LeaderBoards.vue').default);
Vue.component('profile-page', require('./components/ProfilePage.vue').default);


const app = new Vue({
    el: '.main',
});
