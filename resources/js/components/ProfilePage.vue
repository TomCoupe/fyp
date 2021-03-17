<template>
  <div class="card mx-auto col-md-6">
    <div class="card-header">
      <h5>{{this.user.name}}'s Profile</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <img src="/images/pfp.png" width="100" />
        </div>
        <div class="col-md-9">
          <h5>Best Score:</h5>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Points</th>
                <th scope="col">Time Taken</th>
                <th scope="col">Lives</th>
              </tr>
            </thead>
            <tbody>
                <template v-for="score in bestScore">
                    <tr>
                        <td>{{score.points}}</td>
                        <td>{{score.minutes + 'm ' + score.seconds + 's'}}</td>   
                        <td>{{score.lives}}</td>
                    </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <h5>Achievements</h5>&nbsp;
      <div class="row">
        <template v-if="checkForAchievements() === true">
          <!-- complete all three levels without dying -->
          <template v-if="fullLives.length !== 0">
            <div class="col-sm-3 text-center">
              <i
                class="fas fa-award fa-2x"
                data-toggle="tooltip"
                title="Completed all three levels without dying"
              ></i>
            </div>
          </template>

          <!-- complete game in under 3 minutes -->
          <template v-if="underThree.length !== 0">
            <div class="col-sm-3 text-center">
              <i
                class="fas fa-clock fa-2x"
                data-toggle="tooltip"
                title="Completed the game in under three minutes"
              ></i>
            </div>
          </template>

          <!-- complete game in under 3 minutes with all coins collected-->
          <template v-if="underThree.length !== 0 && highestPoints.length !== 0">
            <div class="col-sm-3 text-center">
              <i
                class="fas fa-crown fa-2x"
                data-toggle="tooltip"
                title="Completed the game in under three minutes with all coins collected"
              ></i>
            </div>
          </template>

          <!-- complete game with all coins collected -->
          <template v-if="highestPoints.length !== 0">
            <div class="col-sm-3 text-center">
              <i
                class="fas fa-dollar-sign fa-2x"
                data-toggle="tooltip"
                title="Completed the game with all coins collected"
              ></i>
            </div>
          </template>
        </template>
        <template v-else-if="checkForAchievements() === false">
            <p>No Achievements earned yet!</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

export default {
  name: "ProfilePage.vue",
  props: ["user", "bestscore", "underthree", "fulllives", "highestpoints"],
  data() {
    return {
      bestScore: this.bestscore,
      underThree: this.underthree,
      fullLives: this.fulllives,
      highestPoints: this.highestpoints
    };
  },
  methods: {
    checkForAchievements() {
      let arr = [
        this.bestScore,
        this.underThree,
        this.fullLives,
        this.highestPoints
      ];

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length !== 0) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>