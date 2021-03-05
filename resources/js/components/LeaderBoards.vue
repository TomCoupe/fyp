<template>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
            <h5>LeaderBoards</h5>
        </div>
        <div class="card-body">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Player Name</th>
                        <th scope="col">Points</th>
                        <th scope="col">Time Taken</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(score, index) in highscores">
                    <tr>    
                        <td>{{index+1}}</td>
                        <td>{{score.user.name}}</td>
                        <td>{{score.scores.points}}</td>
                        <td>{{score.scores.minutes + 'm '+ score.scores.seconds + 's'}}</td>
                    </tr>
                    </template>
                </tbody>
                <!-- TODO
                    add tbody that loops through all high scores of players and display in table.
                 -->
            </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: "LeaderBoards.vue",
    props: ['scores'],
    data() {
        return {
            highscores: this.scores,
        }
    }
}
</script>