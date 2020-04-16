import { IsNotEmpty, IsString, MinLength, MaxLength, IsObject } from 'class-validator'
import {} from 'class-transformer'

/**
 * {
 *  "name" : "Name",
 *  "surname": "Surname",
 *  "email": "email@email.com",
 *  "password": "pass@123",
 *  "typeUser": {
 *      "admin": true,
 *      "dealer": false
 *   },
 * }
 */


export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly surname: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly password: string;
    
    @IsNotEmpty()
    @IsObject()
    readonly typeUser: object;
    
    readonly dateAt: Date;
}