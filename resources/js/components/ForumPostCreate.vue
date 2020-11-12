<template>
<div class="col-md-12">
    <div class="card">
        <div class="card-header">
            <div class="float-left">
                <h5>Create a post.</h5>
            </div>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label for="formGroupExampleInput">Forum post title:</label>
                <input type="text" class="form-control" placeholder="Enter your title here." v-model="forumPost.title">
            </div>    
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Forum Post Content:</label>
                <textarea class="form-control" rows="5" placeholder="Enter your text here." v-model="forumPost.postText"></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-dark" @click="saveForumPost">Post</button>
                <button class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'ForumPostCreate.vue',
    props: ['user'],

    data() {
        return {
            user: this.user,
            forumPost: {
                title: '',
                postText: ''
            }
        };
    },

    methods: {
        saveForumPost() {
            if(this.forumPost.title !== '' && this.forumPost.postText !== '') {
                axios.post('/forum/createPost', this.forumPost, {
                    headers: {
                        'content-type': 'text/json',
                    }
                }).then(function(response) { 
                    console.log('sent')
                }).catch(function(error) {
                    console.log('not sent')
                })
            }
        },
    }
}
</script>