//제목, 날짜, 본문

const Sequelize = require('sequelize');

class Notification extends Sequelize.Model{
    static initiate(sequelize){
        Notification.init({
            title:{
                type:Sequelize.TEXT,
                allowNull:false
            },
            main:{
                type:Sequelize.TEXT,
                allowNull: false
            }
        },{
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored:true,
            modelName:'Notification',
            tableName:'notification',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }
    static associate(db){
        db.Notification.hasMany(db.NotificationPhoto, {foreignKey:'notificationId', sourceKey:'id'})
    }
}

module.exports = Notification;