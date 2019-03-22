/* eslint-disable max-len */
/**
 *
 * @api {DELETE} /api/user/:id DELETE /api/user/:id
 * @apiName DELETE /api/user/:id
 * @apiGroup User
 *
 *
 * @apiParam  {String} userId UUID of the user to get
 *
 * @apiSuccess {Number} deletedUsers how many user profiles were deleted
 *
 * @apiParamExample  {String} Request-Example:
 * {
 *     "id" : "0a40cf80-4b2a-11e9-a532-07f768aa6c74"
 * }
 *
 *
 */

module.exports = function deleteUser(app) {
  app.delete('/api/user/:id', async (req, res) => {
    const {
      id,
    } = req.params;

    const deletedUsers = await app.models.User.destroy({
      where: {
        id,
      },
    });

    if (deletedUsers === 0) {
      res.status(404);
      return res.end();
    }

    res.status(200);
    res.json(deletedUsers);
    return res.end();
  });
};
