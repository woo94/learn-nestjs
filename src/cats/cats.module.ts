/**
 * Module은 @Module() decorator로 표현된다. 
 * @Module() decorator는 application structure에 대한 metadata를 제공해준다.
 * 
 * 모든 application은 최소 1개의 module을 가지고 있다: root module
 * Root module은 Nest가 application graph(internal data structure로 module, provider의 relationship과 dependency를 resolve한다)
 * 를 그리기 위한 starting point이다.
 *
 * 아주 작은 크기의 application은 이론적으로 하나의 root module 만을 가지고 있겠지만 이것은 보통의 경우가 아니다.
 * Module은 component를 organize하는데 사용되는 아주 효율적인 방법으로 강력하게 권장된다.
 * 따라서 대부분의 application들에서 architecture는 여러개의 module들로 이루어져있고 capability들을 encapsulating한다.
 * 
 * providers -- Nest injector로 인해서 instantiated 되고 이 모듈 안에서는 공유가 된다.
 * controllers -- controller들의 집합으로 instantiated 되어야 한다.
 * imports -- 이 module에서 필요로하는 provider들을 export 하는 module들
 * exports -- 이 module에 의해 제공되며 이 module을 import 하는 다른 module에서 사용이 가능한 provider들이다.
 * 
 * Module은 provider들을 기본적으로 encapsulate 한다. 이 말은 직접적으로 현재 module의 부분이 아니거나 import된 module에서 export 되지 않은 provider라면
 * 사용할 수 없는 것을 의미한다. 따라서 exported provider들을 module의 public interface or API로 여길 수 있다.
 */

/**
 * Nest에서 module들은 기본적으로 singleton이다. 그렇기 때문에 여러 module간에 이것을 공유하는 것은 어렵지 않다.
 * 모든 module은 기본적으로 shared module이다. 한번 생성되면 어느 module에 의해서든 재사용 될 수 있다.
 * 
 * 여러 module들과 CatsService의 instance를 공유하고 싶은 경우를 떠올려보자.
 * 그렇게 하기 위해서는 CatsService provider를 module의 exports 배열에 넣어서 export 해야한다.
 */

import { Global, Module } from '@nestjs/common'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

/** 
 * 같은 module을 계속해서 import 하는 것은 지루할 수 있다. 
 * Nest와 달리 Angular provider는 global scope에 등록된다. 한번 정의되면 그들은 어디에서나 사용이 가능하다.
 * 하지마나 Nest는 module scope안에서의 provider를 encapsulate 한다. 따라서 module의 provider를 import 하지 않는다면 사용할 수 없다.
 * 
 * 만약 provider들을 어디에서나 사용할 수 있게 하고 싶을때는 module을 @Global() decorator를 사용하여 global하게 만들어주면 된다.
 * 
 * @Global() decorator는 module을 global-scope로 만들어준다. Global module들은 오직 한번만 등록되어야 한다. 주로 root나 core module에서 이것이 이루어진다.
 * 이제 CatsService provider는 어디에서든 접근이 가능하다. CatsService를 이용하고 싶은 모든 module들은 이제부터 CatsModule을 imports 배열에 이를 추가하지 않아도 된다.
 */
@Global()
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    /**
     * 이제부터 CatsModule을 import하는 어떤 module이든 전부 CatsService에 접근 할 수 있고
     * 이것을 import하는 모든 module들에서 같은 instance를 공유하게 된다.
     */
    exports: [CatsService]
})
export class CatsModule {
    /**
     * Module class는 proovider를 inject 할 수 있다.
     * 하지만 module class들은 circular dependency 때문에 provider 처럼 inject 될 수 없다.
     */
    constructor(private catsService: CatsService) { }
}

/**
 * Module re-exporting
 * 
 * 위에서 보듯 module은 자신의 internal provider를 export 할 수 있다. 
 * 이에 더해서 그들은 그들이 import한 module을 re-export 할 수 있다.
 * 
 * 아래의 예시처럼 같은 CommonModule을 CoreModule내에서 import와 동시에 export 할수도 있다.
 * 
 * @Module({
 *  imports: [CommonModule],
 *  exports: [CommonModule]
 * })
 * export class CordModule {}
 */