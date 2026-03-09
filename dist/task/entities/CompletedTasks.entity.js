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
exports.CompletedTasks = void 0;
const auth_entity_1 = require("../../auth/entities/auth.entity");
const typeorm_1 = require("typeorm");
let CompletedTasks = class CompletedTasks {
    id;
    title;
    description;
    completed;
    completedAt;
    userId;
    user;
};
exports.CompletedTasks = CompletedTasks;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CompletedTasks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompletedTasks.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CompletedTasks.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CompletedTasks.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CompletedTasks.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", Number)
], CompletedTasks.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.Auth, (auth) => auth.completedTasks, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], CompletedTasks.prototype, "user", void 0);
exports.CompletedTasks = CompletedTasks = __decorate([
    (0, typeorm_1.Entity)('completed_tasks')
], CompletedTasks);
//# sourceMappingURL=CompletedTasks.entity.js.map