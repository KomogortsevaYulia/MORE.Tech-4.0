const {Sequelize} = require('sequelize');

class Test {
    async get(req, res) {
        const list = 'test'
        return res.json(list);
    }
}

module.exports = new Test();