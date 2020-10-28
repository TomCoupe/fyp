<template>
    <div>
        <template v-for="post in forumPosts">
            <div class="card">
                <h5 class="card-header">Featured</h5>
                    <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ForumHomepage.vue',
    props: ['user', 'posts'],

    mounted() {
        console.log("Component mounted.");
    },

    data() {
        return {
            player: this.user,
            forumPosts: this.posts,
        };
    }
};
</script>