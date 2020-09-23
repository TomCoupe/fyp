<template>
    <div class="center-div buttons">
        <p><a href="/login" class="btn btn-outline" style="width: 300px;">Login</a></p>
        <p><a href="/register" class="btn btn-outline1" style="width: 300px;">Register</a></p>
        <p><a href="#" class="btn btn-outline2" style="width: 300px;">Play as guest</a></p>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        
        data() {
            return {

            }
        }
    }
</script>