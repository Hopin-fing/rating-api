import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import Handlebars from 'handlebars';
import mjml2html from 'mjml';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { RestoreTemplateData } from '../../interfaces/generate-email-html';
import { GenerateEmailHTMLCommand } from './email-generate-html.command';
import root from 'app-root-path';

@CommandHandler(GenerateEmailHTMLCommand<RestoreTemplateData>)
export class GenerateEmailHTMLHandler implements ICommandHandler<GenerateEmailHTMLCommand<RestoreTemplateData>> {
    constructor() {}
    async execute({ data, template }: GenerateEmailHTMLCommand<RestoreTemplateData>): Promise<string> {
        const dataString = (await fs.readFile(path.join(root.path, `./src/templates/${template}.mjml`))).toString();
        return this.getHTMLTemplate(dataString, data);
    }

    private getHTMLTemplate(template: string, data: RestoreTemplateData): string {
        const htmlOutputTemplate = mjml2html(template).html;
        const htmlHandlebarsTemplate = Handlebars.compile(htmlOutputTemplate);
        const filledTemplate = htmlHandlebarsTemplate(data);
        return filledTemplate;
    }
}
