/**
 * @Body() decorator를 사용하여 POST route handler에 값을 전달해보자.
 * 
 * DTO(Data Transfer Object) schema가 필요하다. 
 * DTO는 data가 어떻게 network를 통해서 전달될지를 정의하는 object이다. 
 * Typescript interface나 class를 사용하여 DTO schema를 만들 수 있다.
 * 재미있게도 class를 사용할것을 권장한다. 
 * 왜냐하면 Class는 ES6 standard의 일부여서 compiled Javascript에서도 그 존재가 보존되지만,
 * Typescript interface는 transpilation 과정에서 사라지기 때문이다.
 */
export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}