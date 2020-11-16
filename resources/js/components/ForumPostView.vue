<template>
  <div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5>{{post.title}}</h5>
        </div>
        <div class="card-body">
          <div class="form-group">
            <p class="card-text">{{post.text}}</p>
          </div>
          <div class="float-left">
            <p class="card-text">
              <small class="text-muted">Posted at: {{post.created_at}}</small>
            </p>
          </div>
          <div class="float-right">
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
          </div>
        </div>
      </div>
    </div>&nbsp;
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="float-left">
            <h5>Comment section</h5>
          </div>
          <template v-if="user !== null">
            <div class="float-right">
              <button class="btn btn-outline-dark" @click="addComment">Add a comment</button>
            </div>
          </template>
        </div>
        <div class="card-body">
          <template v-for="obj in comments">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{obj.user.name}}</h5>
                <p class="card-text">{{ obj.comment.text }}</p>
                <p class="card-text">
                  <small class="text-muted">Posted at: {{obj.comment.created_at}}</small>
                </p>
                <div class="bottom-right">
                  &nbsp;
                  <span>
                    <i class="far fa-thumbs-up fa-2x" style="color: green;"></i>
                    {{obj.comment.likes}}
                  </span>
                  &nbsp;
                  <span>
                    <i class="far fa-thumbs-down fa-2x" style="color: red;"></i>
                    {{obj.comment.dislikes}}
                  </span>
                  &nbsp;
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForumPostView.vue",
  props: ["post", "comments"],

  data() {
    return {
      post: this.post
    };
  },

  methods: {
    addComment() {
      window.location.href = "/forum/post/" + this.post.id + "/createComment";
    }
  }
};
</script>