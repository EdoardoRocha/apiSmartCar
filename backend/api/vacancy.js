module.exports = app => {
    const getVacancy = async (req, res) => {
        try {
            const vacancy = await app.db("vaga")
            res.status(200).send(vacancy)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Erro interno do servidor")
        }
    }

    return {
        getVacancy
    }
}