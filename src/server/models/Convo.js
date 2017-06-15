module.exports = (sequelize, DataTypes) => {
  const Convo = sequelize.define('Convo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
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
