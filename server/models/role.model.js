module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            id: Sequelize.INTEGER, 
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Role;
}