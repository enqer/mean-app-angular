import business from '../business/business.container';
import auth from '../middleware/auth';

const postEndpoint = (router) => {
    router.get('/api/posts', async (request, response, next) => {
        try {
            let result = await business.getPostManager().query();
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });

    router.post('/api/posts', auth, async (request, response, next) => {
        try {
            let result = await business.getPostManager().createPost(request.body);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });

    router.get('/api/posts/:id', async (request, response, next) => {
        try {
            const postId = request.params.id;
            let result = await business.getPostManager().get(postId);
            if (result) {
                response.status(200).send(result);
            } else {
                response.status(404).send('Post Not Found');
            }
        } catch (error) {
            console.log(error);
            response.status(500).send('Internal Server Error');
        }
    });

};
export default postEndpoint;
