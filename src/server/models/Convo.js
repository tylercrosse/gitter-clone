module.exports = (sequelize, DataTypes) => {
  const Convo = sequelize.define('Convo', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    direct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Convo.associate = (models) => {
    Convo.hasMany(models.Message, {
      foreignKey: 'convoId',
      as: 'messages'
    });
    Convo.belongsToMany(models.User, {
      through: models.ConvoMembership,
      foreignKey: 'convoId',
      as: 'users'
    });
  };
  return Convo;
};
