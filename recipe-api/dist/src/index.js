"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const conn_1 = require("./db/conn");
const mongodb_1 = require("mongodb");
const recipes_json_1 = __importDefault(require("./population/recipes.json"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conn_1.execUsingMongoClient)((db) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield (db === null || db === void 0 ? void 0 : db.collection("recipes").find({}).toArray());
        return res.json(recipes.map((r) => ({
            _id: r._id,
            title: r.title,
            image: r.image,
            recipeType: r.recipeType,
            tags: r.tags,
        })));
    }));
}));
app.get("/recipes/recipeTypes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conn_1.execUsingMongoClient)((db) => __awaiter(void 0, void 0, void 0, function* () {
        const recipeTypes = yield (db === null || db === void 0 ? void 0 : db.collection("recipeTypes").find({}).toArray());
        return res.json(recipeTypes);
    }));
}));
app.get("/populate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, conn_1.execUsingMongoClient)((db) => __awaiter(void 0, void 0, void 0, function* () {
        const collections = yield (db === null || db === void 0 ? void 0 : db.collections());
        if (collections === null || collections === void 0 ? void 0 : collections.find((c) => c.collectionName === "recipeTypes")) {
            // Drop collection - if exists.
            yield (db === null || db === void 0 ? void 0 : db.dropCollection("recipeTypes"));
        }
        yield (db === null || db === void 0 ? void 0 : db.collection("recipeTypes").insertMany([
            { name: "Appetizers" },
            { name: "Starters" },
            { name: "Main Courses" },
            { name: "Side dishes" },
            { name: "Desserts" },
        ]));
        const recipeTypes = yield (db === null || db === void 0 ? void 0 : db.collection("recipeTypes").find({}).toArray());
        if (collections === null || collections === void 0 ? void 0 : collections.find((c) => c.collectionName === "recipes")) {
            // Drop collection - if exists.
            yield (db === null || db === void 0 ? void 0 : db.dropCollection("recipes"));
        }
        yield (db === null || db === void 0 ? void 0 : db.collection("recipes").insertMany(recipes_json_1.default.map((r) => {
            var _a;
            return (Object.assign(Object.assign({}, r), { recipeType: (_a = recipeTypes === null || recipeTypes === void 0 ? void 0 : recipeTypes.find((rt) => rt.name === r.recipeType)) === null || _a === void 0 ? void 0 : _a._id, image: Buffer.from(r.image, "base64") }));
        })));
        return res.send("Database populated.");
    }));
}));
app.get("/recipes/:recipeId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId } = req.params;
    yield (0, conn_1.execUsingMongoClient)((db) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const recipe = yield (db === null || db === void 0 ? void 0 : db.collection("recipes").findOne({
                _id: new mongodb_1.ObjectId(recipeId),
            }));
            if (!recipe) {
                return res.status(404).send(`Recipe ${recipeId} was not found`);
            }
            return res.json(recipe);
        }
        catch (ex) {
            return res.status(500).send(ex.message);
        }
    }));
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
