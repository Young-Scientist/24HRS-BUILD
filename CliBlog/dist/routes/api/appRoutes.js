"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const appController_ctrl_1 = require("../../controllers/appController.ctrl");
// Respond to /
router.get('/', appController_ctrl_1.App);
module.exports = router;
