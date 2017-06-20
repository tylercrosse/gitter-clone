module.exports = (sequelize, DataTypes) => {
  const ConvoMembership = sequelize.define('ConvoMembership', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastVisited: DataTypes.DATE
  });

  ConvoMembership.associate = (models) => {
    ConvoMembership.belongsTo(models.Convo, {
      foreignKey: 'convoId'
    });
    ConvoMembership.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return ConvoMembership;
};
