import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { EnterpriseService } from './enterprise/enterprise.service';
import { EnterpriseModule } from './enterprise/enterprise.module';
import config from './config/keys'

@Module({
  imports: [
    UserModule, 
    FormModule, 
    EnterpriseModule, 
    MongooseModule.forRoot(
    config.mongoURI, 
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
