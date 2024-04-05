export class AddRecoveryTokenCommand {
    constructor(
        public readonly userId: string,
        public readonly recoveryToken: string,
    ) {}
}
