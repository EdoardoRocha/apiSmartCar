/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  try {
    const result = await knex("vaga").select("id_vaga");

    const count = result.length;

    if (count > 0) return;

    await knex("vaga").del();
    await knex("vaga").insert([
      { id_vaga: 1, status: false, codigo: "V-01" },
      { id_vaga: 2, status: false, codigo: "V-02" },
      { id_vaga: 3, status: false, codigo: "V-03" },
      { id_vaga: 4, status: false, codigo: "V-04" },
      { id_vaga: 5, status: false, codigo: "V-05" },
      { id_vaga: 6, status: false, codigo: "V-06" },
      { id_vaga: 7, status: false, codigo: "V-07" },
      { id_vaga: 8, status: false, codigo: "V-08" },
      { id_vaga: 9, status: false, codigo: "V-09" },
      { id_vaga: 10, status: false, codigo: "V-10" },
    ]);
  } catch (e) {
    console.log("Erro ao criar as seeds: " + e.message);
  }
};
