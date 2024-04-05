export class UpdatePostViewCommand {
    constructor(
        public readonly id: string,
        public readonly views: number,
    ) {}
}
