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
              <a class="card-title" :href="'/forum/post/' + post.id">
                <h5>{{ post.title }}</h5>
              </a>
              <p class="card-text">{{ post.text }}</p>
              <p class="card-text">
                <small class="text-muted">Posted at: {{post.created_at}}</small>
              </p>
              <div class="bottom-right">
                &nbsp;
                <span>
                  <template v-if="checkLikedPosts(post.id)">
                    <i class="fa fa-thumbs-up fa-2x user-liked-button"></i>
                  </template>
                  <template v-else>
                    <i class="far fa-thumbs-up fa-2x like-button"></i>
                  </template>
                  {{post.likes}}
                </span>
                &nbsp;
                <span>
                  <template v-if="checkDislikedPosts(post.id)">
                    <i class="fa fa-thumbs-down fa-2x user-disliked-button"></i>
                  </template>
                  <template v-else>
                  <i class="far fa-thumbs-down fa-2x dislike-button"></i>
                  </template>
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
  props: ["user", "posts", "likes", "dislikes"],

  methods: {
    likePost(postId) {},

    checkLikedPosts(id) {
      for (let index = 0; index < this.likes.length; index++) {
        if (this.likes[index].id == id) {
          return true;
        }
      }
      return false;
    },

    checkDislikedPosts(id) {
      for (let index = 0; index < this.dislikes.length; index++) {
        if (this.dislikes[index].id == id) {
          return true;
        }
      }
      return false;
    }
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