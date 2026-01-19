/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("registros", (table) => {
    table.increments("id").primary();
    table.string("modelo", 255).notNullable();
    table.string("placa", 255).notNullable();
    table.integer("id_vaga").references("id_vaga").inTable("vaga");
    table.timestamp("timestamp_entrada").defaultTo(knex.fn.now());
    table.timestamp("timestamp_saida");
    table.decimal("valor_total", 10, 2).defaultTo(null);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("registros")
};
