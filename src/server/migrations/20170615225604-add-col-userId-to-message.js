

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Messages', 'userId', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    });
  },

  down(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    return queryInterface.removeColumn('Messages', 'userId');
  }
};
