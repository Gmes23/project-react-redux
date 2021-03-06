
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('screenname').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password_digest').notNullable();
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
    return knew.schema.dropTable('users');
};
