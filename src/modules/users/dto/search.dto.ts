import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 50)
  search?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  limit?: number;
}
