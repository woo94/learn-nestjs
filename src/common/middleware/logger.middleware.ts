/**
 * Middleware는 route handler 이전에 호출되는 함수이다.
 * Middleware 함수들은 application의 request-response cycle에서 request와 reseponse object, next() middleware function에 접근할 수 있다.
 * 
 * Custom Nest middleware를 function이나 @Injectable() decorator를 사용한 class로 구현할 수 있다.
 * Class는 NestMiddleware interface를 구현해야하는 반면 function은 어떠한 것도 필요하지 않다. 
 * 
 * Nest middleware는 Dependency Injection이 fully support 된다.
 */

import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...')
        next()
    }
}

/**
 * 위에서 작성한 class는 단순하다. member, method, dependency 등을 필요로하지 않는다.
 * Class 대신에 간단하게 함수로 이것을 작성할수도 있다.
 * 이런 종류의 middleware를 functional middleware라고 한다.
 */
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request...')
    next()
}