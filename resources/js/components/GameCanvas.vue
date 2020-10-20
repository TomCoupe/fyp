<template>
    <div>
        <canvas width="80%" height="60%"></canvas>
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

        };
    }
};
</script>