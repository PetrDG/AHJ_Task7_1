const Router = require('koa-router');
const { v4 } = require('uuid');
const users = require('../../db/users');

const router = new Router();

router.post('/nickname', async (ctx) => {
    const { nickname } = ctx.request.body;
        const user = {};
        user.nickname = nickname;
        user.id = v4();

        if (users.isFreeNickname(nickname)) {
            users.addUser(user);
            ctx.response.body = {
              status: 'free',
              user: user,
            };
            ctx.response.status = 200;
        } else {
            ctx.response.body = {
             status: 'busy',
            };
            ctx.response.status = 200;
        }
});

router.get('/nickname', async (ctx) => {
    ctx.response.body = users.usersBox;
    ctx.response.status = 200;
});

router.delete('/nickname/:id', async (ctx) => {
    const { id } = ctx.params;
    users.delUser(id);
    ctx.response.status = 200;
});

module.exports = router;
