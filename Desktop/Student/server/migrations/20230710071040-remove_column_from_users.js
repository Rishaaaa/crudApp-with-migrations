'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'name');
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('users', 'name', {
            type: Sequelize.STRING,
            allowNull: true, // Adjust the allowNull value based on your column's original definition
        });
    },
};