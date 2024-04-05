export class UpdateUserCommand {
    constructor(
        public readonly uuid: string,
        public readonly avatar: string,
        public readonly name: string,
        public readonly description: string,
    ) {}
}
