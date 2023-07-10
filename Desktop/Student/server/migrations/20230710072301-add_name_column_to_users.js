'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'name', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'admin',
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'name');
    },
};