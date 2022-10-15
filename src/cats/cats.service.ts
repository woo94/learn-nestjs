/**
 * Providers
 * 
 * Nest의 많은 class들이 provider로 다루어질 수 있다 - services, repositories, factories, helpers...
 * Provider의 main idea는 이것은 dependency로 injected 될 수 있다는 것이다.
 * 
 * 이전 chapter에서 우리는 간단한 CatsController를 만들었다.
 * Controllers는 HTTP request를 처리해야하며, 더 복잡한 작업들을 provider들에게 delegate 할 수 있다.
 * Provider들은 module에서 `providers`로 정의된 plain Javascript class들이다.
 * 
 * 
 * Scopes
 * 
 * Provider들은 보통 application lifecycle과 같은 lifetime을 가진다.
 * Application이 bootstrapped 되면, 모든 dependency는 반드시 resolve 되어야 하며 그렇기 때문에 모든 provider는 인스턴스화가 되어야 한다.
 * 비슷하게 application이 종료될 때 모든 provider는 destroy 되어야 한다.
 * 
 * 하지만 provider의 lifetime을 request-scoped로 만드는 방법도 있다(Injection scopes)
 *
 * 
 * Custom providers
 * 
 * Nest는 provider 사이의 관계를 resolve하는 built-in IoC container를 가지고 있다.
 * 이것은 위에서 서술한 dependency injection feature를 가지고 있지만, 설명한 것 이상으로 강력하다.(custom provider)
 * 
 */

/**
 * Services
 * 
 * 단순한 CatsService를 만들면서 시작해보자.
 * 이 service는 data storage, retrieval의 책임을 가지고 있고 CatsController에 의해서 사용되기 위해 디자인된다.
 */

import { Injectable } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'

/**
 * CatsService는 Nest IoC container에 의해서 관리되는 class라는 metadata를 부착시킬때 @Injectable() decorator를 사용한다.
 */
@Injectable()
export class CatsService {
    private readonly cats: Cat[] = []

    create(cat: Cat) {
        this.cats.push(cat)
    }

    findAll(): Cat[] {
        return this.cats
    }
}