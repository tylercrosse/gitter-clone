module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('ConvoMemberships', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      visible: {
        type: Sequelize.BOOLEAN
      },
      lastVisited: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      convoId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Convos',
          key: 'id',
          as: 'convoId'
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      }
    });
  },
  down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    return queryInterface.dropTable('ConvoMemberships');
  }
};
