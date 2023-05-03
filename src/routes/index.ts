import { Router } from 'express';
import { CitiesController, personController, userController } from '../controllers';


const router = Router();

router.get('/',(_, res) => {
    return res.send({message: 'Hello world!!!'});
});                           


router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deletetByIdValidation, CitiesController.deleteById);

router.get('/person', personController.getAllValidation, personController.getAll);
router.post('/person', personController.createValidation, personController.create);
router.get('/person/:id', personController.getByIdValidation, personController.getById);
router.put('/person/:id', personController.updateByIdValidation, personController.updateById);
router.delete('/person/:id', personController.deletetByIdValidation, personController.deleteById);

router.post('/cadaster', userController.signUpValidation, userController.signUp);
router.post('/login', userController.signInValidation , userController.signIn);

router.all('*', (_, res) => res.status(404).send());

export { router };