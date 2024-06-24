import Setting from "../models/settingModel.js";

export const createSetting = async (req, res) => {
    try {
        const { api_key, api_value } = req.body;
        const apiSetting = new Setting({ api_key, api_value });
        const saveApi = await apiSetting.save(); // Await the save operation

        res.status(200).json({ message: 'API value saved successfully', setting: saveApi }); // Respond with status 200 and the saved setting
    } catch (error) {
        res.status(400).json({ message: error.message }); // Use res.status instead of res.send for status codes
    }
};


export const getAllSettings = async (req, res) => {
    try {
        
        const settings = await Setting.find();
        res.status(200).json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateSetting = async (req, res) => {
    try {
        const { api_key , api_value } = req.body;
        const updatedSetting = await Setting.findOneAndUpdate(
            req.params.id,
            { api_key},
            { api_value },
            { new: true, runValidators: true }
        );
        if (!updatedSetting) {
            return res.status(404).json({ message: 'Setting not found' });
        }
        res.status(200).json({ message: 'Setting updated successfully', setting: updatedSetting });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSettingByKey = async (req, res) => {
    try {
        const setting = await Setting.findOne({ api_key: req.params.key });
        if (!setting) {
            return res.status(404).json({ message: 'Setting not found' });
        }
        res.status(200).json(setting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSetting = async (req, res) => {
    try {
        const setting = await Setting.findOneAndDelete(req.params.id );
        console.log(setting)
        if (!setting) {
            return res.status(404).json({ message: 'Setting not found' });
        }
        res.status(200).json({ message: 'Setting deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
