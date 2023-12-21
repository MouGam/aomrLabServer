//사진위치 -> galleryPhoto에, 제목, 설명, 날짜

const Sequelize = require('sequelize');

class Gallery extends Sequelize.Model{
    static initiate(sequelize){
        Gallery.init({
            title:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            description:{
                type:Sequelize.TEXT,
                allowNull: true
            }
        },{
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored:true,
            modelName:'Gallery',
            tableName:'gallery',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }
    static associate(db){
        db.Gallery.hasMany(db.GalleryPhoto, {foreignKey: 'galleryId', sourceKey:'id'});
    }
}

module.exports = Gallery;