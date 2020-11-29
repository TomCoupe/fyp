<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <div class="float-left">
          <h5>Create a comment.</h5>
        </div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Forum Comment:</label>
          <textarea
            class="form-control"
            rows="5"
            placeholder="Enter your text here."
            v-model="forumComment.commentText"
          ></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-dark" @click="create">Create</button>
          <button class="btn btn-danger" @click="goBack">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");

export default {
  name: "ForumCommentCreate",
  props: ["postid"],

  data() {
    return {
      forumComment: {
        commentText: "",
        postid: this.postid
      }
    };
  },
  methods: {
    create() {
        let app = this;
      axios.post("/forum/post/" + app.postid + "/postComment", this.forumComment, {
          headers: {
            "content-type": "text/json"
          }
        })
        .then(function(response) {
          window.location.href = "/forum/post/" + app.postid;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    goBack() {
      window.location.href = "/forum";
    }
  }
};
</script>