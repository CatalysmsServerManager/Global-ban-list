module.exports = function getUnverified(app) {
    app.get('/api/unverified', async (req, res) => {
        const bans = await app.models.ban.findAll({
            include: [app.models.player, app.models.game, app.models.reason],
            where: {
                verified: false,
            }
        })

        if (bans === null) {
            res.status(404);
            return res.end();
        }

        const response = bans.map(ban => {
            return {
                id: ban.id,
                bannedUntil: ban.bannedUntil,
                status: ban.status,
                verified: ban.verified,
                createdAt: ban.createdAt,
                updatedAt: ban.updatedAt,
                game: ban.game,
                reason: ban.reason,
                player: ban.player,
                proof: ban.proof
            }
        })

        return res.json(response);
    });
};