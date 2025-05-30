
class Tile {
    constructor(id, game_id, x, y, color, clicked) {
        this.id = id;
        this.game_id = game_id;
        this.x = x;
        this.y = y;
        this.color = color;
        this.clicked = clicked;
    }
}

module.exports = Tile;
