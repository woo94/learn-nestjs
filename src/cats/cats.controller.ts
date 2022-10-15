/**
 * Controller는 들어오는 request와 반환해주는 response를 조작한다.
 * 
 */

import { Controller, Get, Req, Post, HttpCode, Header, Body, HttpException, HttpStatus } from '@nestjs/common'
import { Request } from 'express'
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto'

// basic controller를 정의하기 위해서는 @Controller() decorator가 필요하다.
// Optional route path prefix `cats`를 설정했다.
@Controller('cats')
export class CatsController {
    /**
     * CatsService는 class constructor를 통해서 inject 되었다.
     * private syntax가 사용됨에 주의해라.
     * 이 shorthand는 같은 위치에서 `catsService` member를 선언과 동시에 초기화 시키게 해준다.
     */
    /**
     * Typescript capability 덕분에 dependency들의 관리가 확연하게 쉬워졌다.
     * 왜냐하면 그들은 타입으로 resolve가 되기 때문이다.
     * 
     * 아래의 constructor에서 Nest는 catsService를 CatsService의 instance를 생성하고 반환하여 resolve 할 것이다.
     * 위에서 언급한 IoC container에 의해서 이러한 dependency는 resolve된다.
     */
    constructor(private catsService: CatsService) { }

    @Post()
    /**
     * @HttpCode(...) decorator를 handler level에서 사용하여 201 status code를 204로 바꿀 수 있다.
     */
    /**
     * 종종 status code는 정적이지 않다. 그런 경우에는 library-specific response(@Res() object inject하여) object를 사용하도록 한다.
     */
    @HttpCode(204)
    /**
     * @Header() decorator를 사용하거나 library-specific response object를 사용하여 response header를 바꿀 수 있다.
     */
    @Header('Cache-Control', 'none')
    create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    /**
     * @Get HTTP request method decorator는 Nest에게 특정한 HTTP request에 대한 endpoint를 만들게 한다.
     * Endpoint는 HTTP request method와 route path와 연관되어있다.
     * Route path란, controller 선언시 설정한 optional prefix와 method의 decorator에 설정한 path를 concat하여 만든다.
     * 모든 route에 대한 prefix를 `cats`로 하였고 method decorator에 아무런 path 정보를 담지 않았기 때문에 `GET /cats` request를 이 handler에 map한다.
     */
    @Get()
    /**
     * GET request가 이 endpoint로 들어오면, Nest는 사용자가 정의한 `findAll()` method에 이 request를 route한다.
     * 우리가 선택한 method이름(findAll)은 어떤것이 와도 상관이 없다. 명시적으로 method를 route로 bind시켜주었기 때문이다.
     */

    /**
     * Manipulating responses - 2 options
     * 
     * 1) Standard(recommended)
     * Built-in method에 의하면, request handler가 javascript object나 array를 반환하면, 자동으로 JSON serialize가 된다.
     * Javascript primitive(string, number, boolean등)을 반환하면 serialize를 하지 않고 값 그 자체를 반환한다.
     * 
     * Status code는 기본으로 200으로 설정된다 (POST method 201 제외)
     * @HttpCode(...) decorator를 handler-level에서 사용하여 이것을 바꿀 수 있다.
     * 
     * 2) Library-specific
     * @Res() decorator를 method handler signature에 사용하여(e.g., findAll(@Res() response)) injected된 library-specific(e.g., Express) response object를 사용할 수 있다.
     * 이 옵션을 그 object에 의해 노출된 native response handling method를 사용할 수 있다.
     * 예를들어 Express와 함께라면 `response.status(200).send()` 같은 response를 만들 수 있다.
     */

    /**
     * Request object
     * 
     * Handler는 종종 client request detail에 접근해야하는 경우가 있다. 
     * `@Req()` decorator를 handler의 signature에 더하여 inject의 방식으로 이 request object에 접근할 수 있게 해준다.
     * 
     * Request object는 request query string, parameter, HTTP header, body 등을 가지고 있다.
     * 이것을 직접 수동으로 가져오는 것은 불필요하다. 대신 `@Body()`나 `@Query()`와 같은 decorator를 사용한다.
     */
    async findAll(@Req() request: Request): Promise<Cat[]> {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        // return 'This action returns all cats'
        return this.catsService.findAll()
    }
}

/**
 * Library-specific approach
 * 
 * Response object에 대한 full control을 제공해준다는 점에서 더 유연하지만 주의해서 사용해야한다.
 * 보통, 이런 접근법은 덜 명시적이며 단점들을 가지고 있다.
 * 주된 단점으로는 code가 platform-dependent 해지기 때문에 test하기 어려워진다는 점이다.
 * 또한 Nest standard response handling으로 인한 Nest feature과의 호환성을 잃게된다는 점이다.
 * @HttpCode() / @Header() decorator들과 Interceptor등을 사용하지 못한다. 이것을 고치기 위해서는 `passthrough` option을 true로 설정해주어야 한다.
 */