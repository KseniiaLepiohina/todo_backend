"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const jwt_guard_1 = require("../jwt.guard");
let TaskController = class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    async create(createTaskDto, req) {
        console.log('req.user:', req.user);
        console.log('DTO from body:', createTaskDto);
        const user_id = req.user?.id;
        if (!user_id)
            throw new common_1.UnauthorizedException('User not found in request');
        return await this.taskService.createTask(createTaskDto, user_id);
    }
    async findActiveTasks(req) {
        const user_id = req.user?.id;
        if (!user_id)
            throw new common_1.UnauthorizedException('User not found in request');
        return await this.taskService.findAllActiveTasks(user_id);
    }
    async updateActiveTask(id, dto) {
        return await this.taskService.updateActiveTask(id, dto);
    }
    async deleteActiveTask(task_id, user_id) {
        return await this.taskService.deleteActiveTask(task_id, user_id);
    }
    ;
    async newCompletedTask(task_id, user_id) {
        return await this.taskService.sendToCompletedTask(user_id, task_id);
    }
    async findCompletedTasks() {
        return await this.taskService.findAllCompletedTasks();
    }
    ;
    async updateCompletedTask(id, title, description) {
        return await this.taskService.updateCompletedTask(id, title, description);
    }
    async deleteCompletedTask(task_id, user_id) {
        return await this.taskService.deleteCompletedTask(task_id, user_id);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findActiveTasks", null);
__decorate([
    (0, common_1.Patch)('active/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateActiveTask", null);
__decorate([
    (0, common_1.Delete)('active/delete/:taskId/:userId'),
    __param(0, (0, common_1.Param)('taskId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteActiveTask", null);
__decorate([
    (0, common_1.Post)('/completed/:userId/:taskId'),
    __param(0, (0, common_1.Param)('task_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "newCompletedTask", null);
__decorate([
    (0, common_1.Get)('completed/find'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findCompletedTasks", null);
__decorate([
    (0, common_1.Patch)('completed/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('title')),
    __param(2, (0, common_1.Param)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateCompletedTask", null);
__decorate([
    (0, common_1.Delete)('completed/delete/:taskId/:userId'),
    __param(0, (0, common_1.Param)('task_id')),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteCompletedTask", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map