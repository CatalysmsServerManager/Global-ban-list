const _ = require('lodash');

module.exports = function setVerified(app) {
    app.post('/api/verified', async (req, res) => {
        const banId = req.body.banId;
        const verifiedStatus = req.body.status;

        if (_.isUndefined(banId)) {
            res.status(400);
            return res.end();
        }

        if (_.isUndefined(verifiedStatus)) {
            res.status(400);
            return res.end();
        }

        if (!_.isBoolean(verifiedStatus)) {
            res.status(400);
            return res.end();
        }

        const banExists = await app.models.ban.count({ where: { id: banId } });

        if (banExists < 1) {
            res.status(404);
            return res.end();
        }

        await app.models.ban.update({ verified: verifiedStatus }, { where: { id: banId } });
        res.status(200);
        return res.json({ success: true });
    });
};