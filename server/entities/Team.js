

class Team {
    constructor(id, name, strategy_id, game_id, socket_id, points, color, current_tileId, created_at) {
        this.id = id;
        this.name = name;
        this.strategy_id = strategy_id;
        this.game_id = game_id;
        this.socket_id = socket_id;
        this.points = points
        this.color = color;
        this.current_tileId = current_tileId
        this.created_at = created_at;
    }
}

module.exports = Team;
