var Test = {
    init(app) {
        app.get('/test/test', this.doTest);
        app.get('/test/show', this.showTest);
    },

    doTest(req, res) {
        res.send({
            status: 1,
            info: '服务器测试服务doTest'
        });
    },

    showTest(req, res) {
        res.send({
            status: 1,
            info: '服务器测试服务showTest'
        });
    }
};

module.exports = Test;
