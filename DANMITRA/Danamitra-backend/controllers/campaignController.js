const Campaign = require('../models/campaignModel'); 

const createCampaign = async (req, res) => {
  const { name , goalAmount, moneyCollected , description , createdAt } = req.body;

  try {
   let campaign = new Campaign({
      name,
      goalAmount,
      moneyCollected,
      description,
      createdAt
    });
    await campaign.save();
    res.status(201).json({
   campaign
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteCampaign = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "Campaign ID is required" });
  }

  try {
    const campaign = await Campaign.findById(_id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    await Campaign.deleteOne({ _id });
    res.status(200).json({
      message: "Campaign deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const campaign = async (req, res) => {
  try {
      const events = await Campaign.find();
      res.status(200).json(events);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch events from MongoDB" });
  }
};

module.exports = {
    createCampaign,
    deleteCampaign,
    campaign
  };