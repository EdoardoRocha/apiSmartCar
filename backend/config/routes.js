module.exports = app => {
  /**
   * @swagger
   * /registros:
   *   get:
   *     summary: Retorna todos os registros
   *     responses:
   *       200:
   *         description: Lista de registros obtida com sucesso
   *   post:
   *     summary: Cria um novo registro
   *     responses:
   *      201:
   *         description: Registro criado com sucesso
   */
  app.route('/registros')
    .post(app.api.records.registering)
    .get(app.api.records.getRecords)

  /**
   * @swagger
   * /vagas:
   *   get:
   *     summary: Retorna as vagas disponíveis
   *     responses:
   *       200:
   *         description: Lista de vagas
   */
  app.route("/vagas")
    .get(app.api.vacancy.getVacancy)

  /**
   * @swagger
   * /registros/checkout:
   *   put:
   *     summary: Realiza o checkout de um registro
   *     responses:
   *       200:
   *         description: Checkout realizado com sucesso
   */
  app.route("/registros/checkout")
    .put(app.api.records.checkout)
}
