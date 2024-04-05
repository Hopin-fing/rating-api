export class CreateUserCommand {
    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly role: string,
        public readonly password: string,
    ) {}
}
