const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
  
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    minHeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxHeight:{
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    minWeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxWeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minAge: {
      type: DataTypes.INTEGER, 
    },
    maxAge: {
    type: DataTypes.INTEGER, 
    },
    img: {
        type: DataTypes.STRING,
    },



  



    });

   
};
