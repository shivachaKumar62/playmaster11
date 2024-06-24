import express from "express";
import {createPage,getAllPages, getPageByName, updatePage, deletePage} from "../controllers/websiteController.js";


const router = express.Router();

router.post('/',createPage);
router.get('/', getAllPages);
router.get('/:page_name', getPageByName);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);

export default router;

