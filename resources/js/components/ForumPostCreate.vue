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
                <label for="exampleFormControlTextarea1">Forum Post Content:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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