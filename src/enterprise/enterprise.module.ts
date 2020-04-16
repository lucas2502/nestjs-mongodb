import { Module } from '@nestjs/common';
import { EnterpriseController } from './enterprise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseSchema } from './schema/enterprise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Enterprise', schema: EnterpriseSchema}
      ])
],
  controllers: [EnterpriseController],
  providers: [EnterpriseService]
})
export class EnterpriseModule {}
