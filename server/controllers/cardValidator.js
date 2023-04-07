const card_validator = require("card-validator");

module.exports = validate_card(card) 
    if (card == null || !card_validator.number(card).isValid) {
        this._errors.count += 1
        this._errors.card.push("card number is not valid.")
    }
