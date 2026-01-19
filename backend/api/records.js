module.exports = (app) => {
  const registering = async (req, res) => {
    const record = { ...req.body };

    if (!record.placa || !record.id_vaga || !record.modelo)
      return res
        .status(404)
        .send(
          "Campos obrigatórios ausentes. Insira: Placa, modelo do veículo e id da vaga desejada.",
        );
    try {
      const vacancy = await app
        .db("vaga")
        .where({ id_vaga: record.id_vaga })
        .first();
      if (!vacancy) return res.status(404).send("Vaga não encontrada.");

      if (vacancy.status) {
        return res.status(400).send("Vaga ocupada!");
      }

      await insertRecord(record);
      await alterStatusVacancy(record.id_vaga);

      return res
        .status(201)
        .send("Registro criado com sucesso");
    } catch (error) {
      console.error(err);
      return res.status(500).send("Erro interno no servidor.");
    }
  };

  const insertRecord = async (record) => {
    await app.db("registros").insert(record);
  };

  const alterStatusVacancy = async (id) => {
    await app.db("vaga").where({ id_vaga: id }).update({ status: true });
  };

  const checkout = async (req, res) => {
    const { placa } = req.body;
    const COST_PER_HOUR = 10.0;

    try {
      await app.db.transaction(async (trx) => {
        const record = await trx("registros")
          .where({ placa })
          .whereNull("saida")
          .first();

        if (!record)
          return res
            .status(404)
            .send("Carro não encontrado ou já realizou o checkout");

        const exitDate = new Date();
        const entryDate = new Date(record.timestamp_entrada);
        const diferentMs = exitDate - entryDate;
        let decimalHours = diferentMs / (1000 * 60 * 60);
        const billedHours = Math.ceil(decimalHours);
        const totalValue = billedHours * COST_PER_HOUR;
        await trx("registros")
          .where({ id: record.id })
          .update({ saida: exitDate, valor_total: totalValue });

        await trx("vaga")
          .where({ id_vaga: record.id_vaga })
          .update({ status: false });

        return res.status(200).send({
          message: `Check-out realizado para ${placa}`,
          permanence: `${decimalHours.toFixed(2)} horas`,
          value: `R$ ${totalValue.toFixed(2)}`,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno no servidor!");
    }
  };

  const getRecords = async (req, res) => {
    try {
      await app
        .db("registros")
        .then((records) => res.status(200).send(records));
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno no servidor");
    }
  };

  return {
    registering,
    checkout,
    getRecords,
  };
};
