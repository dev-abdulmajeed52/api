import Profile from '../models/Profile.js';
import User from '../models/User.js';

export async function createOrUpdateProfile(req, res) {
  try {
    const { bio, experience, skills } = req.body;
    const userId = req.user.id;

    const profileFields = { user: userId, bio, experience, skills };

    let profile = await Profile.findOne({ user: userId });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: userId },
        { $set: profileFields },
        { new: true }
      );
    } else {
      profile = new Profile(profileFields);
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
}

export async function getProfileByUserId(req, res) {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'email', 'role']);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Get Profile Error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
}
