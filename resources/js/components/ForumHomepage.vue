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
                  <button class="button-invis" @click="addOrRemoveLike(post.id)">
                    <template v-if="checkLikedPosts(post.id)">
                      <i class="fa fa-thumbs-up fa-2x user-liked-button"></i>
                    </template>
                    <template v-else>
                      <i class="far fa-thumbs-up fa-2x like-button"></i>
                    </template>
                    {{post.likes}}
                  </button>
                </span>
                &nbsp;
                <span>
                  <button class="button-invis" @click="addOrRemoveDislike(post.id)">
                    <template v-if="checkDislikedPosts(post.id)">
                      <i class="fa fa-thumbs-down fa-2x user-disliked-button"></i>
                    </template>
                    <template v-else>
                      <i class="far fa-thumbs-down fa-2x dislike-button"></i>
                    </template>
                    {{post.dislikes}}
                  </button>
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
const axios = require("axios");
export default {
  name: "ForumHomepage.vue",
  props: ["user", "posts", "likes", "dislikes"],

  methods: {
    likePost(postId) {},

    checkLikedPosts(id) {
      for (let index = 0; index < this.likes.length; index++) {
        if (this.likes[index].forum_post_id == id) {
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
    },

    addOrRemoveLike(id) {
      let app = this;
      if (this.checkLikedPosts(id) == true) {
        for (let index = 0; index < this.likes.length; index++) {
          if (this.likes[index].id == id) {
            axios
              .post("/removeLike", app.likes[index], {
                headers: {
                  "content-type": "text/json"
                }
              })
              .then(function(response) {
                app.likes.splice(index, 1);
              })
              .catch(function(error) {
                console.log("Could not remove like");
              });
            return;
          }
        }
      }
      axios
        .post("/addLike", app.id, {
          headers: {
            "content-type": "text/json"
          }
        })
        .then(function(response) {
          let obj = {
            forum_post_id: id,
            user_id: app.user.id
          };
          app.likes.push(obj);
        })
        .catch(function(error) {
          console.log("Could not add like");
        });
    },

    addOrRemoveDislike(id) {
      let app = this;
      if (this.checkDislikedPosts(id) == true) {
        for (let index = 0; index < this.dislikes.length; index++) {
          if (this.dislikes[index].id == id) {
            axios
              .post("/removeDislike", app.dislikes[index], {
                headers: {
                  "content-type": "text/json"
                }
              })
              .then(function(response) {
                app.dislikes.splice(index, 1);
              })
              .catch(function(error) {
                console.log("Could not remove dislike");
              });
            return;
          }
        }
      }
      axios
        .post("/addDislike", app.id, {
          headers: {
            "content-type": "text/json"
          }
        })
        .then(function(response) {
          let obj = {
            forum_post_id: id,
            user_id: app.user.id
          };
          app.dislikes.push(obj);
        })
        .catch(function(error) {
          console.log("Could not add dislike");
        });
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