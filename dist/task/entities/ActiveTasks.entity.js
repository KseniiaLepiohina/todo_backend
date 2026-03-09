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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveTasks = void 0;
const auth_entity_1 = require("../../auth/entities/auth.entity");
const typeorm_1 = require("typeorm");
let ActiveTasks = class ActiveTasks {
    task_id;
    title;
    description;
    completed;
    createdAt;
    user;
    user_id;
};
exports.ActiveTasks = ActiveTasks;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ActiveTasks.prototype, "task_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ActiveTasks.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ActiveTasks.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ActiveTasks.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ActiveTasks.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.Auth, (auth) => auth.activeTasks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], ActiveTasks.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ActiveTasks.prototype, "user_id", void 0);
exports.ActiveTasks = ActiveTasks = __decorate([
    (0, typeorm_1.Entity)('active_tasks')
], ActiveTasks);
//# sourceMappingURL=ActiveTasks.entity.js.map