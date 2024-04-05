export class EmailSendCommand {
    constructor(
        public readonly toEmail: string,
        public readonly fromEmail: string,
        public readonly fromName: string,
        public readonly subject: string,
        public readonly htmlTemplate: string,
    ) {}
}
