<template>
    <div >
        <canvas class="center-div" id="game" width="640" height="640"></canvas>
    </div>
</template>

<script>
export default {
    name: 'GameCanvas.vue',
    props: ['user'],

    mounted() {
        console.log("Component mounted.");
    },

    data() {
        return {
            player: this.user,
        };
    }
};
</script>