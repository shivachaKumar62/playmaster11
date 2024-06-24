import WebPage from "../models/websiteModel.js";

export const createPage = async (req, res) => {
    try {
        const { page_name, content } = req.body;
        const page = new WebPage({ page_name:page_name, content });
        const savePage = await page.save(); // Await the save operation
        res.status(200).json({ message: 'Page created successfully', page: savePage }); // Respond with status 200 and the saved page
    } catch (error) {
        res.status(400).json({ message: error.message }); // Use res.status instead of res.send for status codes
    }
};

export const getAllPages = async (req, res) => {
    try {
        const pages = await WebPage.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getPageByName = async (req, res) => {
    try {
        const pageName = req.params.name;
        const page = await WebPage.findOne({ name: pageName });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updatePage = async (req, res) => {
    try {
        const { page_name, content } = req.body;
        const updatedPage = await WebPage.findByIdAndUpdate(
            req.params.id,
            { page_name, content },
            { new: true, runValidators: true }
        );
        if (!updatedPage) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json({ message: 'Page updated successfully', page: updatedPage });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




export const deletePage = async (req, res) => {
    try {
        const page = await WebPage.findByIdAndDelete(req.params.id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json({ message: 'Page deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
