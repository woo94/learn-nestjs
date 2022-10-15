import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CatsModule } from './cats/cats.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
@Module({
  /**
   * Cats와 관련된 것을 모두 CatsModule로 만들었다면 이것을 root module에 import 해준다.
   */
  imports: [CatsModule],
  /**
   * CatsController를 만들어도 Nest는 이것의 존재를 알지 못하고 그 결과 이 class의 instance를 만들지 못한다.
   * 
   * Controller는 언제나 module과 함께 간다. 그것이 `controllers` array가 @Module() decorator 내부에 있는 이유이다.
   * 아직 root AppModule을 제외한 module을 정의하지 않았기 때문에 여기에 CatsController를 추가한다.
   */
  // controllers: [AppController, CatsController],
  /**
   * CatsSevice라는 provider를 만들었고 그 service의 consumer가 있다면(CatsController), service를 Nest에 등록시켜 injection을 수행할 수 있게 해줘야 한다.
   * module file의 providers 배열에 service를 추가해준다.
   */
  // providers: [AppService, CatsService],
})
/**
 * Module class의 @Module() decorator에 metadata를 부착해주어서 어떤 controller가 mount 될지 알게 해준다.
 */
export class AppModule implements NestModule {
  /**
   * @Module() decorator 안에는 middleware를 지정하는 곳이 없다.
   * 대신 우리는 Module class의 configure() method에서 이를 지정해줄수 있다.
   * Middleware를 포함하는 module은 NestModule interface를 구현해야한다.
   */
  configure(consumer: MiddlewareConsumer) {
    /**
     * MiddlewareConsumer는 helper class이다.
     * 이것은 middleware를 관리하기 위한 몇가지의 built-in method를 가지고 있다.
     * 그들은 모두 간단하게 chain이 될 수 있는 fluent style이다.
     */
    consumer
      .apply(LoggerMiddleware)
      /**
       * CatsController에서 정의된 /cats route handler에 LoggerMiddleware를 설정하였다.
       * forRoutes() method안에 path와 method를 적은 object를 건내주어 특정한 request method로 middleware의 적용을 한정시킬수도 있다.
       */
      // .forRoutes('cats')
      .forRoutes({ path: 'cats', method: RequestMethod.GET })
  }
}
