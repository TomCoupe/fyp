<template>
    <div>
            <div class="card" width="80%">
                <h5 class="card-header">Discussion Forum</h5>
                    <div class="card-body">
                        <div class="card">
                            dsaasdasdas
                        </div>
                        <div class="card">
                            dsaasdasdas
                        </div>
                        <div class="card">
                            dsaasdasdas
                        </div>
                        <div class="card">
                            dsaasdasdas
                        </div>
                        
                    </div>
            </div>
        <!-- </template> -->
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