import { Template } from '../../interfaces/generate-email-html';

export class GenerateEmailHTMLCommand<T> {
    constructor(
        public readonly data: T,
        public readonly template: Template,
    ) {}
}
