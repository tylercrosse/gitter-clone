module.exports = {
  up(queryInterface, Sequelize) { // eslint-disable-line no-unused-vars
    return queryInterface.removeColumn('Messages', 'username');
  },

  down(queryInterface, Sequelize) {
    return queryInterface.addColumn('Messages', 'username', Sequelize.STRING);
  }
};
