module.exports = function home(app) {
  app.get('/', (req, res) => {
    res.render('index', {});
  });
};
