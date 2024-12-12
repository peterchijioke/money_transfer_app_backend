"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAVEN_BASE_URL = exports.RAVEN_API_KEY = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'your_jwt_secret';
exports.RAVEN_API_KEY = (_b = process.env.RAVEN_API_KEY) !== null && _b !== void 0 ? _b : 'your_raven_api_key';
exports.RAVEN_BASE_URL = (_c = process.env.RAVEN_API_KEY) !== null && _c !== void 0 ? _c : "";
