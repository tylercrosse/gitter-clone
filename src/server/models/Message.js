module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rawMarkup: DataTypes.STRING,
    username: DataTypes.STRING
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Convo, {
      foreignKey: 'convoId',
      onDelete: 'CASCADE'
    });
  };
  return Message;
};
