import { Router } from 'express';
import { CitiesController } from '../controllers';


const router = Router();

router.get('/',(_, res) => {
    return res.send({message: 'Hello world!!!'});
});                           


router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deletetByIdValidation, CitiesController.deleteById);
router.all('*', (_, res) => res.status(404).send());
export { router };