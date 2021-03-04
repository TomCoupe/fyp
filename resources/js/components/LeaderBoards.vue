<template>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
            LeaderBoards
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
                    <template v-for="score in highscores">
                    <tr>    
                        <td>1</td>
                        <td>d</td>
                        <td>{{score.points}}</td>
                        <td>{{score.minutes + 'm '+ score.seconds + 's'}}</td>
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