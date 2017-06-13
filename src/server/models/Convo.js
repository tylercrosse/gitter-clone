module.exports = (sequelize, DataTypes) => {
  const Convo = sequelize.define('Convo', {
    name: DataTypes.STRING,
    direct: DataTypes.BOOLEAN
  });

  Convo.associate = (models) => {
    Convo.hasMany(models.Message, {
      foreignKey: 'convoId',
      as: 'messages'
    });
  };
  return Convo;
};
