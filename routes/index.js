const express = require('express');
const router = express.Router();
const auth = require('http-auth');
const aUnm = process.env.CONTROLLER_NAME || 'no-name';
const aPw = process.env.CONTROLLER_PW || 'someAmazingP@$$w0rd';

// Configure basic auth
const basic = auth.basic(
  {
    realm: 'SUPER SECRET STUFF'
  },
  (username, password, callback) => {
    // callback(username === aUnm && password === aPw);
    callback(username === 'grocky')
  }
);

const authMiddleware = auth.connect(basic);

/* GET home page. */
router.get('/', (req, res) => {
  console.log('rendering slides');
  res.render('slides', { isPresenter: false });
});

/* GET controller page. */
router.get('/control', authMiddleware, (req, res) => {
  res.render('slides', { isPresenter: true });
});

module.exports = router;

