const News = require("../schemas/news.schema");
const newsCtrl = {};

const errors = {
  args: {
    no_exist: 'No existe',
    missing: 'No aparece'
  },
  item: {
    no_exist: 'No existe',
    missing: 'No aparece'
  },
  no_exist: 'No existe',
  missing: 'No aparece',
  no_results: 'No hay resultados'
}

const status = {
  saved: 'saved',
  updated: 'updated',
  deleted: 'deleted',
}


newsCtrl.getNews = async (req, res, next) => {
  const news = await News.find(req.query);

  if (!news) {
    res.status(500).send(errors.no_results);
    return next()
  }
  res.json(news);
};

newsCtrl.createNews = async (req, res) => {
  if(!req.body){
    res.status(500).send(errors.item.no_exist);
    return next()
  }
  const news = new News(req.body[0]);

  if (!news) {
    res.status(500).send(errors.no_results);
    return next()
  }
  await news.save();
  res.status(200).send({ status: 200 });
};

newsCtrl.editNew = async (req, res) => {

  if (!req.params || req.body.item) {
    res.status(500).send(errors.args.no_exist);
    return next()

  }
  const { id } = req.params;

  if (!id) {
    res.status(500).send(errors.missing);
    return next()
  }
  const news = req.body.item
  if (!news) {
    res.status(500).send(errors.no_results);
    return next()
  }
  await News.findByIdAndUpdate(id, { $set: news });
  res.json({ status: `New ${status.updated}` });
};

newsCtrl.deleteNew = async (req, res) => {

  if (!req.params.id) {
    res.status(500).send(errors.missing);
    return next()
  }
  await News.findByIdAndRemove(req.params.id);
  res.json({ status: `New ${status.deleted}` });
};

module.exports = newsCtrl;
