const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const fs = require('fs');
const cors = require('cors');

const passport = require('passport');
const localStrategy = require('passport-local');
const crypto = require('crypto');

const indexRouter = require('./routes');
const memberRouter = require('./routes/member');
const galleryRouter = require('./routes/gallery');
const notificationRouter = require('./routes/notification');

const {sequelize} = require('./models');

const app = express();

app.set('port', process.env.PORT || 3030);

sequelize.sync({force:false})
.then(()=>{
    console.log('db연결 성공');
})
.catch((err)=>{
    console.error(err);
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/photo/gallery', express.static(path.join(__dirname, 'photo/gallery')));
app.use('/photo/members', express.static(path.join(__dirname, 'photo/members')));
app.use('/photo/notification', express.static(path.join(__dirname, 'photo/notification')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// passport.use(new localStrategy((username, pw, cb)=>{

// }))

app.use('/gallery', galleryRouter);
app.use('/member', memberRouter);
app.use('/notification', notificationRouter);
app.use('/login',(req, res, next)=>{
    if(`${req.body.pw}` === '1234'){
        res.send('success');
    }else{
        res.send('fail');
    }
});

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없어요`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err:{};
    res.status(err.status || 500);
    res.send('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});