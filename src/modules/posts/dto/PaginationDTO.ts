import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Min(1)
    page: number = 1;
    
    @ApiProperty()
    @IsInt()
    @IsOptional()
    @Min(5)
    @Max(100)
    limit: number = 10;
}