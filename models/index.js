const Sequelize = require('sequelize');
const Member = require('./member');
const Gallery = require('./gallery');
const GalleryPhoto = require('./galleryphoto');
const Notification =require('./notification');
const NotificationPhoto = require('./notificationphoto');

const env = process.env.NODE_ENV||'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;


db.Member = Member;
db.Gallery = Gallery;
db.GalleryPhoto = GalleryPhoto;
db.Notification = Notification;
db.NotificationPhoto = NotificationPhoto;

Member.initiate(sequelize);
Gallery.initiate(sequelize);
GalleryPhoto.initiate(sequelize);
Notification.initiate(sequelize);
NotificationPhoto.initiate(sequelize);

Member.associate(db);
Gallery.associate(db);
GalleryPhoto.associate(db);
Notification.associate(db);
NotificationPhoto.associate(db);

module.exports = db;