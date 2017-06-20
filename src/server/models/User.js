module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  });

  User.associate = (models) => {
    User.hasMany(models.Message, {
      foreignKey: 'userId',
      as: 'messages'
    });
    User.belongsToMany(models.Convo, {
      through: models.ConvoMembership,
      foreignKey: 'userId',
      as: 'convos'
    });
  };
  return User;
};
