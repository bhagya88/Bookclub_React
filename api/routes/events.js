var router = require('express').Router();
var models = require('../models');
var sequelizeConnection = models.sequelize;
var Sequelize = models.Sequelize;


// middleware that is specific to this router - logs time of request
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next();
});

//  GET /api/events
router.get('/', function(req, res) {

    return models.Event.findAll({

        include: [
            {
                model: models.Member,
                attributes: { exclude: ['password']}

            }, {
                model: models.Book
            }
        ],
        order: [
            ['dt', 'DESC'],
        ],
        limit: 10

    }).then(function(results) {
        //console.log(results);
        res.json(results);
    });

});

// GET /api/events/:yearMonth
router.get('/:yearMonth', function(req, res) {
    let yearMonth = req.params.yearMonth.split('-');
    let year = parseInt(yearMonth[0]);
    let month = parseInt(yearMonth[1]);

    return models.Event.findOne({
        include: [
            {
                model: models.Member,
                attributes: { exclude: ['password']}
            }, {
                model: models.Book
            }
        ],
        where: {
            $and: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dt')), year),
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dt')), month)
            ]
        }

    }).then(function(results) {
        //console.log(results);
        res.json(results);
    });

});

// POST /api/events/new
router.post('/new', function(req, res) {
  let { dt, notes, MemberId} = req.body;
  let { title, author }  = req.body;
  let event = { dt, notes, MemberId};
  let book = { title, author };
  let date = new Date(event.dt);
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // zero-based


  return models.Event.findOne({
    where: {
        /*
        SELECT `id`, `dt`, `notes`, `createdAt`, `updatedAt`, `MemberId` FROM `Events` AS `Event`
         WHERE (YEAR(`dt`) = 2017 AND MONTH(`dt`) = 2) LIMIT 1;
        */
        $and: [
            Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dt')), year),
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('dt')), month)
        ]
    }
  }).then(result => {
    if (result) {
      let msg = `Month of ${year}-${month} is taken. Try another month.`;
      res.json({error: msg})
    } else {

        return models.Event.create(event)
          .then(newEvent => {
              return models.Book.create(book)
              .then(newBook => {
                newEvent.setBook(newBook);
                // Add Book info to Event
                newEvent.dataValues.Book = newBook.dataValues;
                //console.log(newEvent.dataValues);
                res.json(newEvent);
              })
              .catch(err => err)
          })
          .catch(err => err)
    }


  })
  .catch(err => { throw err });

})

module.exports = router;
