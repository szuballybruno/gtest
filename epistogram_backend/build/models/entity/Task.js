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
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Task = class Task {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Task.prototype, "dueData", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Task.prototype, "objective", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Task.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.tasks),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", User_1.User)
], Task.prototype, "user", void 0);
Task = __decorate([
    typeorm_1.Entity()
], Task);
exports.Task = Task;
//# sourceMappingURL=Task.js.map