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
                <br />
                <!-- <small class="text-muted">Posted by: {{getUserFromPost(post.user_id)}}</small> -->
              </p>
              <div class="bottom-right">
                &nbsp;
                <span>
                  <button class="button-invis" @click="addOrRemoveLike(post.id)">
                    <i
                      :class="{'fa fa-thumbs-up fa-2x user-liked-button' : checkLikedPosts(post.id), 'far fa-thumbs-up fa-2x like-button': !checkLikedPosts(post.id)}"
                    ></i>
                    {{getNumOfLikes(post.id)}}
                  </button>
                </span>
                &nbsp;
                <span>
                  <button class="button-invis" @click="addOrRemoveDislike(post.id)">
                    <i
                      :class="{ 'fa fa-thumbs-down fa-2x user-disliked-button': checkDislikedPosts(post.id), 'far fa-thumbs-down fa-2x dislike-button': !checkDislikedPosts(post.id) }"
                    ></i>
                    {{getNumOfDislikes(post.id)}}
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
    checkLikedPosts(id) {
      for (let index = 0; index < this.likes.length; index++) {
        if (this.likes[index].forum_post_id == id) {
          return true;
        }
      }
      return false;
    },
    getNumOfLikes(postId){
      let temp = 0;
      for(let i = 0; i < this.likes.length; i++) {
        if(this.likes[i].forum_post_id == postId) {
          temp += 1;
        }
      }
      return temp;
    },

    getNumOfDislikes(postId){
      let temp = 0;
      for(let i = 0; i < this.dislikes.length; i++) {
        if(this.dislikes[i].forum_post_id == postId) {
          temp += 1;
        }
      }
      return temp;
    },

    checkDislikedPosts(id) {
      for (let index = 0; index < this.dislikes.length; index++) {
        if (this.dislikes[index].forum_post_id == id) {
          return true;
        }
      }
      return false;
    },

    addOrRemoveLike(id) {
      let app = this;
      if (this.checkLikedPosts(id) == true) {
        for (let index = 0; index < this.likes.length; index++) {
          if (this.likes[index].forum_post_id == id) {
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
            window.location.href = "/forum";
            return;
          }
        }
      }
      let obj = {
        forum_post_id: id,
        user_id: app.user.id
      };
      axios
        .post("/addLike", obj, {
          headers: {
            "content-type": "text/json"
          }
        })
        .then(function(response) {
          app.likes.push(obj);

          if (checkDislikedPosts(id) == true) {
            app.addOrRemoveDislike(id);
          }
        })
        .catch(function(error) {
          console.log("Could not add like");
        });
      window.location.href = "/forum";
    },

    getUserFromPost(id) {
      axios.post('/userID', id, {
        headers: {
          "content-type": "text/json"
        }
      })
      .then(function(response) {
          return response.data[0].name;
      })
      .catch(function(error) {
        console.log(error);
      });
    },

    addOrRemoveDislike(id) {
      let app = this;
      if (this.checkDislikedPosts(id) == true) {
        for (let index = 0; index < this.dislikes.length; index++) {
          if (this.dislikes[index].forum_post_id == id) {
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
            window.location.href = "/forum";
            return;
          }
        }
      }
      let obj = {
        forum_post_id: id,
        user_id: app.user.id
      };
      axios
        .post("/addDislike", obj, {
          headers: {
            "content-type": "text/json"
          }
        })
        .then(function(response) {
          app.dislikes.push(obj);

          if (app.checkLikedPosts(id) == true) {
            app.addOrRemoveLike(id);
          }
        })
        .catch(function(error) {
          console.log("Could not add dislike");
        });
      window.location.href = "/forum";
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