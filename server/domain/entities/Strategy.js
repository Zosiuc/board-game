class Strategy {
    constructor(id,category_id, name, icon, color, isChosen) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.isChosen = isChosen;
    }
}

module.exports = Strategy;
