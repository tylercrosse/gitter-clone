module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rawMarkup: DataTypes.STRING
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Convo, {
      foreignKey: 'convoId',
      onDelete: 'CASCADE'
    });
    Message.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Message;
};
