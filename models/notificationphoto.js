//사진위치
const Sequelize = require('sequelize');

class NotificationPhoto extends Sequelize.Model{
    static initiate(sequelize){
        NotificationPhoto.init({
            fileLink:{
                type:Sequelize.STRING(100),
                allowNull:false
            }
        },{
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored:true,
            modelName:'NotificationPhoto',
            tableName:'Notificationphoto',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }
    static associate(db){
        db.NotificationPhoto.belongsTo(db.Notification, {foreignKey: 'notificationId', targetKey:'id'});
    }
}


module.exports = NotificationPhoto;