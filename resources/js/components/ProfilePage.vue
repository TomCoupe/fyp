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
                    <h5>Best Score:</h5>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Points</th>
                                <th scope="col">Time Taken</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>points</td>
                                <td>time</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <h5>Achievements</h5>
            &nbsp;
            <div class="row">
                <!-- complete all three levels without dying -->
                <div class="col-sm-3 text-center">
                    <i class="fas fa-award fa-2x" data-toggle="tooltip" title="Completed all three levels without dying"></i>
                </div>

                <!-- complete game in under 3 minutes -->
                <div class="col-sm-3 text-center">
                    <i class="fas fa-clock fa-2x" data-toggle="tooltip" title="Completed the game in under three minutes"></i>
                </div>

                <!-- complete game in under 3 minutes with all coins collected-->
                <div class="col-sm-3 text-center">
                    <i class="fas fa-crown fa-2x" data-toggle="tooltip" title="Completed the game in under three minutes with all coins collected"></i>
                </div>

                <!-- complete game with all coins collected -->
                <div class="col-sm-3 text-center">
                    <i class="fas fa-dollar-sign fa-2x" data-toggle="tooltip" title="Completed the game with all coins collected"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

export default {
    name: "ProfilePage.vue",
    props: ["user", "bestscore", "underthree", "fulllives", "highestpoints"],
    data() {
        return {

        }
    }
}
</script>