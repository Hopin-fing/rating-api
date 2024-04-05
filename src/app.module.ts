import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '@common/utils';
import { SitemapModule } from '@common/sitemap';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { DatabaseModule } from '@common/database';
import { ProductModule } from './module/product/product.module';
import { PostModule } from './module/post/post.module';
import { CategoryModule } from './module/category/category.module';
import { QuestionAnswerModule } from './module/question-answer/question-answer.module';
import { SearchModule } from './module/search/search.module';
import { AuthorModule } from './module/author/author.module';
import { FilesModule } from './module/files/files.module';
import { EmailModule } from '@common/integrations/email/email.module';
import { GotoModule } from '@common/goto/goto.module';
import { ReviewModule } from './module/review/review.module';
import { DomainModule } from './module/domain/domain.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: config => validateConfig(config),
        }),
        AuthorModule,
        AuthModule,
        UserModule,
        FilesModule,
        DatabaseModule,
        ProductModule,
        PostModule,
        CategoryModule,
        QuestionAnswerModule,
        SearchModule,
        SitemapModule,
        EmailModule,
        GotoModule,
        ReviewModule,
        DomainModule,
    ],
    providers: [],
})
export class AppModule {}
