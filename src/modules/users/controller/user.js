import userModel from "../../../DB/models/user.schema.js"
import { asyncHandler } from "../../../utils/errorHandling.js"
import { compare, hash } from "../../../utils/hashAndCompare.js"




export const userHome = (req, res, next) => {
    res.json({ message: "User Home" })
}

export const allUsers = asyncHandler(async (req, res, next) => {
    const users = await userModel.find()
    res.json({ message: "All Users", users })
})

export const singleUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return next(new Error("id is required"))
    }
    const user = await userModel.findById(id)
    res.json({ message: "Single User", user })
})

export const myProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.user
    const user = await userModel.findById(id)
    res.json({ message: "My Profile", user })
})

export const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body
    if (!id) {
        return next(new Error("id is required"));
    }

    const user = await userModel.findById(id);
    if (!user) {
        return next(new Error("User not found"));
    }
    user.role = role;
    await user.save();
    res.json({ message: "User updated successfully", user });

});

export const updateActive = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new Error("id is required"));
    }
    const user = await userModel.findById(id);
    if (!user) {
        return next(new Error("User not found"));
    }
    user.active = !user.active;
    await user.save();
    res.json({ message: `User active status updated to ${user.active}`, user });
});


export const updateMyProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { fullName, phone } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
        return next(new Error("User not found"));
    }
    user.fullName = fullName;
    user.phone = phone;
    await user.save();
    res.json({ message: "My Profile updated successfully", user });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const user = await userModel.findById(id);
    if (!user) {
        return next(new Error("User not found"));
    }
    const defultPassword = "12345678";
    const hashedPassword = hash({ plainText: defultPassword });
    const resetPassword = await userModel.findOneAndUpdate({ _id: id }, { password: hashedPassword }, { new: true });
    res.json({ message: "Password updated successfully", resetPassword });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { oldPassword, password, cPassword } = req.body;

    const getUser = await userModel.findById(id);
    if (!getUser) {
        return next(new Error("User not found"));
    }
    const compareOldPassword = compare({ plainText: oldPassword, hashValue: getUser.password });
    if (!compareOldPassword) {
        return next(new Error("please enter correct old password"));
    }

    if (password !== cPassword) {
        return next(new Error("password not match"));
    }
    const hashedPassword = hash({ plainText: password });
    const updatePassword = await userModel.findOneAndUpdate({ _id: id }, { password: hashedPassword }, { new: true });
    res.json({ message: "Password updated successfully", updatePassword });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new Error("id is required"));
    }
    const getUser = await userModel.findById(id);
    if (!getUser) {
        return next(new Error("User not found"));
    }
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
});

