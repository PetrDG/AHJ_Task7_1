const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const users = require('../../db/users');
const { v4 } = require('uuid');

const router = new Router();

router.get('/sse/:id', async (ctx) => {
    const { id } = ctx.params;
    
    streamEvents(ctx.req, ctx.res, {
        async fetch(lastEventId) {
            console.log('fetch', lastEventId);
            
            return [];
        },
        
        async stream(sse) {
            users.addlistener(
                {
                    idListener: id,
                    handler: (user) => {
                        sse.sendEvent({
                            id: v4(),
                            data: JSON.stringify(user),
                        })
                    }
                }
            )
        },

        async onError(error) {
            console.log(error.message);
        }
    });

    ctx.req.on('close', function () {
        users.delUser(id);
        users.delListener(id);
    });

    ctx.respond = false;
});


module.exports = router;
