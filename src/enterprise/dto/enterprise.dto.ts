import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, IsNotEmptyObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateUserDTO } from '../../user/dto/user.dto'

export class CreateEnterpriseDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name: string;
   
    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(20)
    readonly cnpj: number

    @IsNotEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(12)
    readonly telephone: number;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    readonly end: string;

    
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly userId: string;
        
    readonly dateAt: Date;
}
