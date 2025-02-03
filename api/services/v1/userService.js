import db from "../../db.js";
import bcrypt from "bcrypt";
import { generateBase32String } from "../../tools/base32.js";

export const createUser = async (user) => {
    if (!user.email) throw new Error("No email provided");
    if (!user.password) throw new Error("No password provided");
    const exists = await db("users").where({ email: user.email }).first();
    if (exists) throw new Error("User already exists");
    let attempts = 0;
    let done = false;
    let id = "";
    while (!done) {
        if (attempts > 1000) throw new Error("Too many attempts");
        id = "user_" + generateBase32String(16).toLowerCase();
        const existingUser = await db("users").where({ id }).first();
        if (!existingUser) done = true;
        attempts++;
    }
    user.id = id;
    await db("users").insert({
        id,
        email: user.email,
        password_hash: await bcrypt.hash(user.password, 10),
    });
    const inserted = await db("users").where({ id }).first();
    return inserted;
};

export const retrieveUser = async (userId) => {
    const user = await db("users").where({ id: userId }).first();
    return user;
};

export const retrieveUserComplete = async (userId) => {
    const user = await db("users").where({ id: userId }).first();
    if (!user) throw new Error("User not found");
    const userInfo = await db("user_info").where({ user_id: userId }).first();
    if (!userInfo) throw new Error("User info not found");
    delete userInfo.user_id;
    return { ...user, ...userInfo };
};

export const updateUser = async (userId, user) => {
    await db("users").where({ id: userId }).update(user);
    const updated = await db("users").where({ id: userId }).first();
    return updated;
};

export const deleteUser = async (userId) => {
    await db("users").where({ id: userId }).update({ disabled: 1 });
    return userId;
};

export const createUserInfo = async (userInfo) => {
    if (!userInfo.user_id) throw new Error("No user_id provided");
    await db("user_info").insert(userInfo);
    const inserted = await db("user_info")
        .where({ user_id: userInfo.user_id })
        .first();
    return inserted;
};

export const retrieveUserInfo = async (userId) => {
    const userInfo = await db("user_info").where({ user_id: userId }).first();
    if (!userInfo) throw new Error("User info not found");
    return userInfo;
};

export const updateUserInfo = async (userId, userInfo) => {
    await db("user_info").where({ user_id: userId }).update(userInfo);
    const updated = await db("user_info").where({ user_id: userId }).first();
    return updated;
};

export const authenticateUser = async (email, password) => {
    const user = await db("users").where({ email }).first();
    if (!user) throw new Error("User not found");
    if (!bcrypt.compare(password, user.password_hash))
        throw new Error("Incorrect password");
    const userInfo = await retrieveUserInfo(user.id);
    if (!userInfo) throw new Error("User info not found");
    return { ...user, ...userInfo };
};
