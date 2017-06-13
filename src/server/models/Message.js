module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rawMarkup: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Message.belongsTo(models.Convo, {
          foreignKey: 'convoId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Message;
};
