

class Question {
    constructor(id, category_id, strategy_id, lang, content) {
        this.id = id;
        this.category_id = category_id;
        this.strategy_id = strategy_id;
        this.lang = lang;
        this.content = content;
    }
}

module.exports = Question;
