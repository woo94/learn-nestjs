import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
  imports: [],
  /**
   * CatsController를 만들어도 Nest는 이것의 존재를 알지 못하고 그 결과 이 class의 instance를 만들지 못한다.
   * 
   * Controller는 언제나 module과 함께 간다. 그것이 `controllers` array가 @Module() decorator 내부에 있는 이유이다.
   * 아직 root AppModule을 제외한 module을 정의하지 않았기 때문에 여기에 CatsController를 추가한다.
   */
  controllers: [AppController, CatsController],
  /**
   * CatsSevice라는 provider를 만들었고 그 service의 consumer가 있다면(CatsController), service를 Nest에 등록시켜 injection을 수행할 수 있게 해줘야 한다.
   * module file의 providers 배열에 service를 추가해준다.
   */
  providers: [AppService, CatsService],
})
/**
 * Module class의 @Module() decorator에 metadata를 부착해주어서 어떤 controller가 mount 될지 알게 해준다.
 */
export class AppModule { }
