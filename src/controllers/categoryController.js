import category from "../models/categoryModel.js";


export const categorCreate = async (req,res) =>{
    try{
        const { name } = req.body;
        const newCategory  = new category({name:name});
        const categorySave = await newCategory .save();
        res.status(200).json(categorySave);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
    
}

export const getAllCategories = async (req, res) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getCategoryById = async (req, res) => {
    try {
        const Category = await category.findById(req.params.id);
        if (!Category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(Category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const Category = await category.findByIdAndDelete(req.params.id);
        if (!Category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
