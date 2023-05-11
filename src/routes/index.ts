import { Router } from 'express';
import { CitiesController, personController, userController } from '../controllers';
import { ensureAuthenticated } from '../shared';


const router = Router();

router.get('/',(_, res) => {
    return res.send({message: 'Hello world!!!'});
});                           


router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', ensureAuthenticated, CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', ensureAuthenticated, CitiesController.deletetByIdValidation, CitiesController.deleteById);

router.get('/person', ensureAuthenticated, personController.getAllValidation, personController.getAll);
router.post('/person', ensureAuthenticated, personController.createValidation, personController.create);
router.get('/person/:id', ensureAuthenticated, personController.getByIdValidation, personController.getById);
router.put('/person/:id', ensureAuthenticated, personController.updateByIdValidation, personController.updateById);
router.delete('/person/:id', ensureAuthenticated, personController.deletetByIdValidation, personController.deleteById);

router.post('/cadaster', userController.signUpValidation, userController.signUp);
router.post('/login', userController.signInValidation , userController.signIn);

router.all('*', (_, res) => res.status(404).send());

export { router };