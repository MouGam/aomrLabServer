//이름, 직책(교수 혹은 과정), 사진위치, 분야, 이메일, 번호, 링크, 업적

const Sequelize = require('sequelize');

class Member extends Sequelize.Model{
    static initiate(sequelize){
        Member.init({
            name:{
                type:Sequelize.STRING(50),
                allowNull:false
            },
            position:{
                type:Sequelize.ENUM('Prof', 'Ph', 'Ma', 'Ba'),
                allowNull:false
            },
            img:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            field:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            email:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            phone:{
                type:Sequelize.STRING(100),
                allowNull:true
            },
            link:{
                type:Sequelize.STRING(100),
                allowNull:true
            }
        },{
            sequelize,
            timestamps: true,
            paranoid: false,
            underscored:true,
            modelName:'Member',
            tableName:'member',
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci'
        })
    }
    static associate(db){

    }
}

module.exports = Member;