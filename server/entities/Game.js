class Game {
    constructor(id, category_id, master_socket, rounds, teams_count, lang, status, created_at) {
        this.id = id;
        this.category_id = category_id;
        this.master_socket = master_socket;
        this.rounds = rounds;
        this.teams_count = teams_count;
        this.lang = lang;
        this.status = status;
        this.created_at = created_at;
    }
}

module.exports = Game;
