<template>
    <div class="card mx-auto col-md-6">
        <div class="card-header">
            <h5>{{this.user.name}}'s Profile</h5>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-3">
                    <img src="/images/pfp.png" width="100">
                </div>
                <div class="col-md-9">
                    dsfhbkjsdbfkjsdb
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfilePage.vue",
    props: ["user"],
    data() {
        return {

        }
    }
}
</script>