const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dbz_react_db')
const{STRING,UUID,UUIDV4,INTEGER,ENUM} = Sequelize

const Character = conn.define('character',{
    id:{
        type:UUID,
        primaryKey:true,
        defaultValue:UUIDV4
    },
    name:{
        type:STRING,
        unique:true,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    species:{
        type:ENUM('Saiyan','Namek','Earthling'),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    finalTransformation:{
        type:STRING
    },
    powerLevel:{
        type:INTEGER,
        allowNull:false,
        defaultValue:0
    }

})


const seed = async() => {
    await conn.sync({force:true})
    const goku = await Character.create({name:'Goku',species:'Saiyan',finalTransformation:'Ultra Instinct',powerLevel:5000000})
    const vegeta = await Character.create({name:'Vegeta',species:'Saiyan',finalTransformation:'Super Saiyan Blue Evolution',powerLevel:3500000})
    const gohan = await Character.create({name:'Gohan',species:'Saiyan',finalTransformation:'Super Saiyan 2',powerLevel:1000000})
    const picollo = await Character.create({name:'Picollo',species:'Namek',finalTransformation:'Super Namek',powerLevel:1000000})
    const krillin = await Character.create({name:'Krillin',species:'Earthling',powerLevel:500000})
}

module.exports = {
    conn,
    Character,
    seed
}