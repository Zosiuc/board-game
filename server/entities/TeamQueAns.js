

class TeamQueAns {
    constructor(id, game_id, team_id, question_id, moderator_id,answer,score, feedback, round_number, created_at, updated_at) {
        this.id = id;
        this.game_id = game_id;
        this.team_id = team_id;
        this.question_id = question_id;
        this.moderator_id = moderator_id;
        this.answer = answer;
        this.score = score;
        this.feedback = feedback;
        this.round_number = round_number;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = TeamQueAns;
