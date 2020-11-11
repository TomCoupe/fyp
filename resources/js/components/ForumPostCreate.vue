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
                <input type="text" class="form-control" placeholder="Enter your title here.">
            </div>    
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Forum Post Content:</label>
                <textarea class="form-control" rows="5" placeholder="Enter your text here."></textarea>
            </div>
            <div class="form-group">
                <button class="btn btn-dark">Post</button>
                <button class="btn btn-danger">Cancel</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'ForumPostCreate.vue',
    props: ['user'],

    data() {
        return {
            user: this.user,
        };
    }
}
</script>