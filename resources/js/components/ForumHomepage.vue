<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <div class="float-left">
          <h5>Discussion Forum</h5>
        </div>
        <template v-if="user !== null">
          <div class="float-right">
            <a class="btn btn-outline-dark" href="/forum/create" type="button">Create a new post</a>
          </div>
        </template>
      </div>
      <div class="card-body">
        <template v-for="post in forumPosts">
          &nbsp;
          <div class="card">
            <div class="card-body">
              <a class="card-title" :href="'/forum/post/' + post.id"><h5>{{ post.title }}</h5></a>
              <p class="card-text">{{ post.text }}</p>
              <p class="card-text">
                <small class="text-muted">Posted at: {{post.created_at}}</small>
              </p>
              <div class="bottom-right">
                &nbsp;
                <span>
                  <i class="far fa-thumbs-up fa-2x" style="color: green;"></i>
                  {{post.likes}}
                </span>
                &nbsp;
                <span>
                  <i class="far fa-thumbs-down fa-2x" style="color: red;"></i>
                  {{post.dislikes}}
                </span>
                &nbsp;
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumHomepage.vue",
  props: ["user", "posts"],

  methods: {

    likePost(postId) {}
  },

  data() {
    return {
      val: 0,
      player: this.user,
      forumPosts: this.posts
    };
  }
};
</script>